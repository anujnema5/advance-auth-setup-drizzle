import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import {migrate} from 'drizzle-orm/postgres-js/migrator'
import 'dotenv/config'
import { db } from '.';

async function main() {
    console.log("Migration started...")
    await migrate(db, {migrationsFolder: "drizzle"})
    console.log("Migration Ended")
    process.exit(0)
}

main().catch((e)=> {
    console.log(e)
    process.exit(0)
})