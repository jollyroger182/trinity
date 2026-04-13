import { resolve } from '$app/paths'
import { EXTERNAL_URL, HACKATIME_CLIENT_ID, HACKATIME_CLIENT_SECRET } from '$env/static/private'
import { db } from '$lib/server/db/index'
import { users } from '$lib/server/db/schema'
import { error, redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function GET({ request, locals }) {
	if (!locals.userId) {
		return Response.json({ error: 'You are not logged in' }, { status: 401 })
	}

	const url = new URL(request.url)

	const code = url.searchParams.get('code')
	if (!code) return error(400, 'No code provided')

	const payload = new FormData()
	payload.set('client_id', HACKATIME_CLIENT_ID)
	payload.set('client_secret', HACKATIME_CLIENT_SECRET)
	payload.set('redirect_uri', `${EXTERNAL_URL}/auth/hackatime/callback`)
	payload.set('code', code)
	payload.set('grant_type', 'authorization_code')

	const resp = await fetch('https://hackatime.hackclub.com/oauth/token', {
		method: 'POST',
		body: payload,
	})
	if (!resp.ok) {
		console.error('Hackatime returned non-200 status:', await resp.text())
		return error(500, 'Upstream auth provider error')
	}

	const { access_token } = (await resp.json()) as {
		access_token: string
	}

	await db.update(users).set({ hackatimeToken: access_token }).where(eq(users.id, locals.userId))

	return redirect(307, resolve('/dashboard'))
}
