// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			server: Bun.Server<WebSocketData>
			request: Request
		}

		interface Locals {
			userId?: string
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}

	interface WebSocketData {
		userId?: string
		wrapped?: import('./lib/server/api/websocket').BunWebsocketWrapper
	}
}

export {}
