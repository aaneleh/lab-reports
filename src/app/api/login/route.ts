import { NextRequest, NextResponse } from "next/server";
import db from "../db";
import bcrypt from "bcryptjs";

const DB_NAME = process.env.DB_NAME;

export async function POST(req:NextRequest){
    try {
        const reqbody = await req.json();

        const password = reqbody.password;
        const name = reqbody.name;
        const getUser = await db.query<any>(`SELECT password FROM "${DB_NAME}".users WHERE name=$1`, [name]);
        if(getUser.rowCount == null || getUser.rowCount < 1) {
            console.error("User not found: ", getUser); 
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        } 

        const hashedPassword = getUser.rows[0].password;

        console.log(hashedPassword)

        bcrypt.compare(password, hashedPassword,
            async function (err, isMatch) {

                if (!isMatch) {
                    console.error("Wrong password"); 
                    return NextResponse.json(
                        { message: "Wrong password" },
                        { status: 400 }
                    )
                } else if(err) {
                    console.error("Error comparing password: ",err); 
                    return NextResponse.json(
                        { message: "Error comparing password" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(
                    { message: "Login successfull" },
                    { status: 200 }
                )
            }
        )

    } catch (err){
        console.error("Error creating user: ", err); 
        return NextResponse.json(
            { message: "Error creating user" },
            { status: 500 }
        )
    }

    return NextResponse.json(
        { message: "Login successfull" },
        { status: 200 }
    )
}