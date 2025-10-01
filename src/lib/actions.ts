import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SESSION_KEY = new TextEncoder().encode(process.env.SESSION_KEY);

export async function encrypt(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 hour from now')
        .sign(SESSION_KEY)
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, SESSION_KEY, {
        algorithms: ['HS256'],
    })
    return payload;
}

export async function login(formData: FormData){
    console.log(formData);
    const user = { usuario: formData.get('usuario'), senha: formData.get('senha')};
    //TODO Consultar banco de dados para validar usuário

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({user, expires});

    (await cookies()).set('session', session, {expires, httpOnly: true});
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