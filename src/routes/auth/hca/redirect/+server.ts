import { EXTERNAL_URL, HCA_CLIENT_ID } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export async function GET() {
	const url = new URL('https://auth.hackclub.com/oauth/authorize?response_type=code')
	url.searchParams.set('client_id', HCA_CLIENT_ID)
	url.searchParams.set('redirect_uri', `${EXTERNAL_URL}/auth/hca/callback`)
	url.searchParams.set('scope', 'openid name verification_status slack_id')
	return redirect(307, url)
}
