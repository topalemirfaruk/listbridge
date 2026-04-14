import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// Server-side: service_role ile bağlan, RLS'i bypass et
const client = postgres(connectionString, {
  prepare: false,
  connection: {
    options: '-c role=service_role',
  },
})

export const db = drizzle(client, { schema })
