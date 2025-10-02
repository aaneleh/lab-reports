import 'server-only';
import { Pool, QueryResult, QueryResultRow } from 'pg'

declare global {
    var pgPool: Pool | undefined;

    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_NAME: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_PORT?: number;
            DB_CA_CERTIFICATE?: string;
        }

        interface Global {
            pgPool?: Pool;
        }
    }
}

interface Database {
    query<T extends QueryResultRow = any>(
        text: string,
        params?: any[]
    ): Promise<QueryResult<T>>;

    getPool(): Pool;
    end(): Promise<void>;
}

const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}

const getPool = (): Pool => {
    if(!global.pgPool){
        global.pgPool = new Pool(poolConfig);

        global.pgPool.on("error", (err) => {
            console.log("Unexpected error on idle cliente", err);
            process.exit(-1);
        })

        if(process.env.NODE_ENV !== "production"){
            //@ts-ignore
            if(module.hot){
                //@ts-ignore
                module.hot.dispose(()=> {
                    if(global.pgPool){
                        global.pgPool.end();
                        global.pgPool = undefined;
                    }
                })
            }
        }
    }

    return global.pgPool;
}

const initDb = async (): Promise<void> => {
    const pool = getPool();
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            uuid UUID PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            admin BOOLEAN DEFAULT false
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log("Database initialized: 'users' table is ready.");
    } catch (err) {
        console.log("Error initializing database: ", err);
        throw err;
    }
}

initDb().catch((err) => {
    console.log("Failed to initialize the database: ", err);
    process.exit(1);
})

const db: Database = {

    query: function <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
        const pool = getPool();
        return pool.query<T>(text, params);
    },

    getPool: (): Pool => {
        return getPool();
    },

    end: async (): Promise<void> => {
        if(global.pgPool){
            await global.pgPool.end();
            global.pgPool = undefined;
        }
    }
}

export default db;