import { db } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import { users } from '$lib/server/db/schema'

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.userId
		? await db.query.users.findFirst({ where: eq(users.id, locals.userId) })
		: undefined

	return {
		userId: user?.id,
		name: user?.name,
	}
}
