import { RpcTarget } from 'capnweb'

export class RPCSession extends RpcTarget {
	ping() {
		return 'pong'
	}
}
