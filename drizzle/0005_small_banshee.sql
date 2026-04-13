ALTER TABLE "users" ADD COLUMN "hackatime_token" text;--> statement-breakpoint
CREATE INDEX "projects_user_id_created_at_index" ON "projects" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "submissions_project_id_created_at_index" ON "submissions" USING btree ("project_id","created_at");