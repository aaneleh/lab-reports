import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { default as axios } from 'axios';
import { User } from "@/types/user";

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


async function checkUser(user : User): Promise<User | null>{
    let userRes: User | null = null; 

    await axios.post(`${process.env.API_URL}/login`, {
        name: user.name,
        password: user.password
    }).then((res) => {
        userRes = {
            uuid: res.data.data.uuid,
            name: user.name,
            admin: res.data.data.admin
        };
    }).catch((err) => {
        console.log("err",err.status)
    })
    
    return userRes;
}

export async function login(user : User){
    const userRes = await checkUser(user);
    
    if(userRes == null) return false;
    const uuid = userRes.uuid;
    const name = userRes.name;
    const admin = userRes.admin;
    
    const expires = new Date(Date.now() + 600 * 1000);
    const session = await encrypt({uuid, name, admin, expires});
    
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