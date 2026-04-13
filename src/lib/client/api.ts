import { env } from '$env/dynamic/public'
import type { CreateProject, RPCSession } from '$lib/server/api/api'
import { newWebSocketRpcSession } from 'capnweb'

export const api = newWebSocketRpcSession<RPCSession>(env.PUBLIC_WEBSOCKET_URL ?? '/api')

export async function createProject(params: CreateProject) {
	using user = api.getAuthedUser()
	using project = user.createProject(params)
	return await mapProject(project)
}

export async function mapProject(
	project: ReturnType<ReturnType<typeof api.getAuthedUser>['createProject']>,
) {
	const [id, name, description, repoUrl, playableUrl, hackatimeProjects] = await Promise.all([
		project.id,
		project.name,
		project.description,
		project.repoUrl,
		project.playableUrl,
		project.hackatimeProjects,
	])
	return { id, name, description, repoUrl, playableUrl, hackatimeProjects }
}
