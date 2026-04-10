import { relations } from 'drizzle-orm'
import {
	foreignKey,
	integer,
	json,
	pgEnum,
	pgTable,
	real,
	serial,
	text,
	timestamp,
	unique,
} from 'drizzle-orm/pg-core'

export const submissionStatus = pgEnum('submission_status', ['pending', 'rejected', 'approved'])

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
	projects: many(projects),
	sessions: many(sessions),
}))

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
})

export const sessionRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}))

export const projects = pgTable(
	'projects',
	{
		id: serial('id').primaryKey(),
		userId: text('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		name: text('name').notNull(),
		description: text('description').default('').notNull(),
		playableUrl: text('playable_url'),
		repoUrl: text('repo_url'),
		hackatimeProjects: json('hackatime_projects').$type<string[]>().default([]).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [unique().on(table.id, table.userId)],
)

export const projectRelations = relations(projects, ({ one, many }) => ({
	user: one(users, {
		fields: [projects.userId],
		references: [users.id],
	}),
	submissions: many(submissions),
}))

export const submissions = pgTable(
	'submissions',
	{
		id: serial('id').primaryKey(),
		projectId: integer('project_id').notNull(),
		userId: text('user_id').notNull(),
		hours: real('hours').notNull(),
		status: submissionStatus('status').default('pending').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.projectId, table.userId],
			foreignColumns: [projects.id, projects.userId],
		}),
	],
)

export const submissionRelations = relations(submissions, ({ one }) => ({
	project: one(projects, {
		fields: [submissions.projectId, submissions.userId],
		references: [projects.id, projects.userId],
	}),
}))
