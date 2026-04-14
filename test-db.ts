import postgres from 'postgres'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const url = process.env.DATABASE_URL!
console.log('Connecting to:', url.replace(/:[^@]+@/, ':***@'))

const sql = postgres(url, {
  prepare: false,
  connection: { options: '-c role=service_role' }
})

try {
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
  console.log('✅ Tables:', tables.map(r => r.table_name))
  const wm = await sql`SELECT count(*) FROM workspace_members`
  console.log('✅ workspace_members count:', wm[0].count)
} catch(e: any) {
  console.error('❌ ERROR:', e.message)
  console.error('Code:', e.code)
}
await sql.end()
process.exit(0)
