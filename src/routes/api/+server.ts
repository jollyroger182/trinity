import { RPCSession } from '$lib/server/api/api'
import { newHttpBatchRpcResponse } from 'capnweb'

export async function POST({ request }) {
	return await newHttpBatchRpcResponse(request, new RPCSession())
}
