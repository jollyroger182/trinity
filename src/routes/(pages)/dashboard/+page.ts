import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { api } from '$lib/client/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	using user = api.getAuthedUser()
	using projectsPromise = user.getProjects()
	using projects = projectsPromise.map((p) => ({
		id: p.id,
		name: p.name,
		description: p.description,
		repoUrl: p.repoUrl,
		playableUrl: p.playableUrl,
		hackatimeProjects: p.hackatimeProjects,
	}))

	try {
		return {
			name: await user.name,
			projects: await projects,
			isHackatimeLinked: await user.isHackatimeLinked,
		}
	} catch {
		return goto(resolve('/auth/hca/redirect'))
	}
}
