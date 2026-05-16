CREATE TABLE IF NOT EXISTS "analytics_event" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar(255) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"visitor_hash" varchar(128) NOT NULL,
	"source" varchar(255),
	"referrer" text,
	"user_agent" text,
	"device" varchar(50),
	"duration_seconds" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_lead" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"linkedin" varchar(500),
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics_event" ADD CONSTRAINT "analytics_event_document_id_document_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("document_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_lead" ADD CONSTRAINT "portfolio_lead_document_id_document_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("document_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "analytics_event_document_id_idx" ON "analytics_event" ("document_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "analytics_event_created_at_idx" ON "analytics_event" ("created_at");
