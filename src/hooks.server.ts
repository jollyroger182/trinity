import { dev } from '$app/environment'
import { RPCSession } from '$lib/server/api/api'
import { BunWebsocketWrapper } from '$lib/server/api/websocket'
import { db } from '$lib/server/db'
import { sessions } from '$lib/server/db/schema'
import type { Handle } from '@sveltejs/kit'
import { newWebSocketRpcSession } from 'capnweb'
import { eq } from 'drizzle-orm'

export const handle: Handle = async ({ event, resolve }) => {
	const { request, cookies, locals } = event
	const url = new URL(request.url)

	if (
		request.headers.get('connection')?.toLowerCase().includes('upgrade') &&
		request.headers.get('upgrade')?.toLowerCase() === 'websocket' &&
		url.pathname === '/api' &&
		event.platform?.server
	) {
		if (event.platform.server.upgrade(event.platform.request, { data: {} })) {
			return new Response(null, { status: 101 })
		}
	}

	const sessionId = cookies.get('sessionid')
	if (sessionId) {
		const session = await db.query.sessions.findFirst({ where: eq(sessions.id, sessionId) })
		if (session) {
			if (session.expiresAt.getTime() > Date.now()) {
				locals.userId = session.userId
			} else {
				cookies.delete('sessionid', { path: '/', httpOnly: true, secure: !dev, sameSite: 'lax' })
			}
		}
	}

	return resolve(event)
}

export const websocket: Bun.WebSocketHandler<WebSocketData> = {
	open(ws) {
		const wrapped = new BunWebsocketWrapper(ws)
		ws.data.wrapped = wrapped
		newWebSocketRpcSession(wrapped as unknown as WebSocket, new RPCSession())
	},
	message(ws, message) {
		ws.data.wrapped?.dispatchEvent(new MessageEvent('message', { data: message }))
	},
	close(ws, code, reason) {
		ws.data.wrapped?.dispatchEvent(new CloseEvent('close', { code, reason }))
	},
}
