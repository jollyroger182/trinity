import { resolve } from '$app/paths'
import { EXTERNAL_URL, HACKATIME_CLIENT_ID } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export async function GET({ locals }) {
	if (!locals.userId) {
		return redirect(307, resolve('/auth/hca/redirect'))
	}

	const url = new URL('https://hackatime.hackclub.com/oauth/authorize?response_type=code')
	url.searchParams.set('client_id', HACKATIME_CLIENT_ID)
	url.searchParams.set('redirect_uri', `${EXTERNAL_URL}/auth/hackatime/callback`)
	url.searchParams.set('scope', 'profile read')
	return redirect(307, url)
}
