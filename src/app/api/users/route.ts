import { NextRequest, NextResponse } from "next/server";
import db from "../db";
import { v7 as uuidv7 } from 'uuid';
const bcrypt = require('bcryptjs');

const DB_NAME = process.env.DB_NAME;

export async function GET(){
  try {
    const result = await db.query<any>(`SELECT * FROM "${DB_NAME}".users`);

    return NextResponse.json(
      { data: result.rows },
      { status: 200 }
    )
    
  } catch(err){
    console.error("Error fetching users: ", err); 

    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    )
  }
} 

export async function DELETE(req:NextRequest){
  try {
    const uuid = req.nextUrl.searchParams.get("uuid")
    await db.query<any>(`DELETE FROM "${DB_NAME}".users WHERE uuid=$1`, [uuid]);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    )

  } catch(err){
    console.error("Error deleting users: ", err); 

    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    )
  }
} 

export async function POST(req:NextRequest){
  try {
    const reqbody = await req.json();
    const uuid = uuidv7();

    bcrypt.genSalt(10, function (err: any, Salt: any) {
      if (err) return console.log('Cannot salt');

      bcrypt.hash(reqbody.password, Salt, async function (err: any, hash: any) {

        if (err) return console.log('Cannot encrypt');
      
        const hashedPassword = hash;
        await db.query<any>(`INSERT INTO "${DB_NAME}".users VALUES ($1, $2, $3, $4)`, [uuid, reqbody.name, hashedPassword, reqbody.admin]);
      })
    })

  } catch (err){
    console.error("Error creating user: ", err); 
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  )
}