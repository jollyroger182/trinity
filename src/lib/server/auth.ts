import { HCA_CLIENT_ID } from '$env/static/private'
import { createRemoteJWKSet, jwtVerify } from 'jose'

const JWKS = createRemoteJWKSet(new URL('https://auth.hackclub.com/oauth/discovery/keys'))

export interface IDTokenPayload {
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	auth_time: number
	slack_id: string
	verification_status: string
	ysws_eligible: boolean
}

export async function verifyIdToken(token: string) {
	const { payload } = await jwtVerify<IDTokenPayload>(token, JWKS, {
		issuer: 'https://auth.hackclub.com',
		audience: HCA_CLIENT_ID,
	})
	return payload
}
