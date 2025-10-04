import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { default as axios } from 'axios';

const SESSION_KEY = new TextEncoder().encode(process.env.SESSION_KEY);

async function encrypt(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 hour from now')
        .sign(SESSION_KEY)
}

async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, SESSION_KEY, {
        algorithms: ['HS256'],
    })
    return payload;
}


async function checkUser(user : any, password : any): Promise<string | null>{
    let uuid: string | null = null; 

    await axios.post(`${process.env.API_URL}/login`, {
        name: user,
        password: password
    }).then((res) => {
        console.log("data", res.data)
        uuid = res.data.data;
    }).catch((err) => {
        console.log("err",err.status)
    })
    
    return uuid;
}

export async function login(formData: FormData){
    const user = { name: formData.get('usuario'), password: formData.get('senha')};
    const uuid = await checkUser(user.name, user.password);

    if(uuid == null) return false;
    
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({uuid, user, expires});
    
    (await cookies()).set('session', session, {expires, httpOnly: true});
    return true;
}

export async function logout() {
    (await cookies()).set('session', '', { expires: new Date(0)});
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest){
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    })
    return res;
}