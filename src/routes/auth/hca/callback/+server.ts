import { dev } from '$app/environment'
import { EXTERNAL_URL, HCA_CLIENT_ID, HCA_CLIENT_SECRET } from '$env/static/private'
import { verifyIdToken } from '$lib/server/auth'
import { db } from '$lib/server/db/index'
import { sessions, users } from '$lib/server/db/schema'
import { error, redirect } from '@sveltejs/kit'
import { randomUUID } from 'crypto'

export async function GET({ request, cookies }) {
	const url = new URL(request.url)

	const code = url.searchParams.get('code')
	if (!code) return error(400, 'No code provided')

	const payload = new FormData()
	payload.set('client_id', HCA_CLIENT_ID)
	payload.set('client_secret', HCA_CLIENT_SECRET)
	payload.set('redirect_uri', `${EXTERNAL_URL}/auth/hca/callback`)
	payload.set('code', code)
	payload.set('grant_type', 'authorization_code')

	const resp = await fetch('https://auth.hackclub.com/oauth/token', {
		method: 'POST',
		body: payload,
	})
	if (!resp.ok) {
		console.error('HCA returned non-200 status:', await resp.text())
		return error(500, 'Upstream auth provider error')
	}

	const { access_token, id_token } = (await resp.json()) as {
		access_token: string
		id_token: string
	}

	const userInfoResp = await fetch('https://auth.hackclub.com/api/v1/me', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	if (!userInfoResp.ok) {
		console.error('HCA /me returned non-200 status:', await userInfoResp.text())
		return error(500, 'Upstream auth provider error')
	}

	const {
		identity: { first_name },
	} = await userInfoResp.json()

	const claims = await verifyIdToken(id_token)

	const sessionId = randomUUID()
	await db
		.insert(users)
		.values({ id: claims.slack_id, name: first_name })
		.onConflictDoUpdate({ target: users.id, set: { name: first_name } })
	await db.insert(sessions).values({
		id: sessionId,
		userId: claims.slack_id,
		expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
	})

	cookies.set('sessionid', sessionId, { path: '/', httpOnly: true, secure: !dev, sameSite: 'lax' })

	return redirect(307, '/')
}
