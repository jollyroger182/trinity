import { RpcTarget } from 'capnweb'
import { db, type Project, type User } from '../db'
import { eq } from 'drizzle-orm'
import { projects, users } from '../db/schema'
import z from 'zod'

const createProjectSchema = z.object({
	name: z.string().nonempty(),
	description: z.string(),
	hackatimeProjects: z.string().array(),
})
export type CreateProject = z.infer<typeof createProjectSchema>

export class RPCSession extends RpcTarget {
	constructor(private userId?: string) {
		super()
	}

	ping() {
		return 'pong'
	}

	async getAuthedUser() {
		if (!this.userId) throw new Error('You are not authenticated')
		const data = await db.query.users.findFirst({ where: eq(users.id, this.userId) })
		if (!data) throw new Error('User is not found')
		return new AuthedUser(data)
	}
}

export class AuthedUser extends RpcTarget {
	constructor(private user: User) {
		super()
	}

	get id() {
		return this.user.id
	}

	get name() {
		return this.user.name
	}

	get isHackatimeLinked() {
		return !!this.user.hackatimeToken
	}

	async getProjects() {
		const data = await db.query.projects.findMany({ where: eq(projects.userId, this.user.id) })
		return data.map((p) => new OwnedProject(p))
	}

	async createProject(payload: CreateProject) {
		const { name, description, hackatimeProjects } = createProjectSchema.parse(payload)
		const [data] = await db
			.insert(projects)
			.values({ userId: this.user.id, name, description, hackatimeProjects })
			.returning()
		return new OwnedProject(data)
	}
}

export class OwnedProject extends RpcTarget {
	constructor(private project: Project) {
		super()
	}

	get id() {
		return this.project.id
	}

	get name() {
		return this.project.name
	}

	get description() {
		return this.project.description
	}

	get repoUrl() {
		return this.project.repoUrl
	}

	get playableUrl() {
		return this.project.playableUrl
	}

	get hackatimeProjects() {
		return this.project.hackatimeProjects
	}
}
