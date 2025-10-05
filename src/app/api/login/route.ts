import { NextRequest, NextResponse } from "next/server";
import db from "../db";
import bcrypt from "bcryptjs";
import { QueryResult } from "pg";
import { User } from "@/types/user";

const DB_NAME = process.env.DB_NAME;

export async function POST(req:NextRequest){
    let getUser: QueryResult<any>;
    try {
        const reqbody = await req.json();
        const user : User = { name: reqbody.name, password: reqbody.password}

        getUser = await db.query<any>(`SELECT uuid, password FROM "${DB_NAME}".users WHERE name=$1`, [user.name]);
        if(getUser.rowCount == null || getUser.rowCount < 1) {
            console.error("User not found"/* , getUser */); 
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        } 
        const hashedPassword = getUser.rows[0].password;
        if(user.password == null ){
            return NextResponse.json(
                { message: "Error comparing password" },
                { status: 500 }
            )
        }
        bcrypt.compare(user.password, hashedPassword,
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
                    { data: getUser.rows[0].uuid },
                    { status: 200 }
                )
            }
        )

    } catch (err){
        console.error("Error comparing password: ", err); 
        return NextResponse.json(
            { message: "Error comparing password" },
            { status: 500 }
        )
    }

    return NextResponse.json(
        { data: getUser.rows[0].uuid },
        { status: 200 }
    )
}