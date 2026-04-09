// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			server: Bun.Server<WebSocketData>
			request: Request
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}

	interface WebSocketData {
		wrapped?: import('./lib/server/api/websocket').BunWebsocketWrapper
	}
}

export {}
