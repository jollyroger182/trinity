import { env } from '$env/dynamic/private'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const db = drizzle(env.DATABASE_URL, { schema })

export type User = typeof schema.users.$inferSelect
export type Project = typeof schema.projects.$inferSelect
export type Submission = typeof schema.submissions.$inferSelect
