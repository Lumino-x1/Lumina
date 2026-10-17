-- Add the timestamp used by every successful publishing path.
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMPTZ(3);

-- Persist queue work atomically with a schedule change. A dispatcher delivers
-- these records to BullMQ after the database transaction commits.
CREATE TABLE IF NOT EXISTS "PublishOutboxEvent" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "scheduleVersion" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMPTZ(3) NOT NULL,
    "processedAt" TIMESTAMPTZ(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PublishOutboxEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PublishOutboxEvent_postId_scheduleVersion_key"
  ON "PublishOutboxEvent"("postId", "scheduleVersion");
CREATE INDEX IF NOT EXISTS "PublishOutboxEvent_processedAt_createdAt_idx"
  ON "PublishOutboxEvent"("processedAt", "createdAt");
CREATE INDEX IF NOT EXISTS "Post_authorId_status_scheduledAt_idx"
  ON "Post"("authorId", "status", "scheduledAt");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PublishOutboxEvent_postId_fkey'
  ) THEN
    ALTER TABLE "PublishOutboxEvent"
      ADD CONSTRAINT "PublishOutboxEvent_postId_fkey"
      FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
