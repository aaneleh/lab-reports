import db from "../db";

const DB_NAME = process.env.DB_NAME;

export async function GET(req:Request){

  try {
    const result = await db.query<any>(`SELECT * FROM "${DB_NAME}".users`);

    return new Response(JSON.stringify({"data": result.rows}),{
        status:200,
        headers:{ "Content-Type": "application/json" }
    })

  } catch(err){
    console.error("Error fetching users: ", err); 
  }

  return new Response(JSON.stringify({"message": "Error fetching users"}),{
      status: 500,
      headers:{ "Content-Type": "application/json" }
  })

}