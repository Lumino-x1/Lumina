-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "scheduleVersion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scheduledAt" TIMESTAMPTZ(3),
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE INDEX "Post_status_scheduledAt_idx" ON "Post"("status", "scheduledAt");
