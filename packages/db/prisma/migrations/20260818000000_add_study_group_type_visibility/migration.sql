-- CreateEnum
CREATE TYPE "StudyGroupType" AS ENUM ('SUBJECT', 'EXAM', 'PROJECT', 'ASSIGNMENT');

-- CreateEnum
CREATE TYPE "StudyGroupVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "StudyGroup" ADD COLUMN "type" "StudyGroupType" NOT NULL DEFAULT 'SUBJECT';
ALTER TABLE "StudyGroup" ADD COLUMN "visibility" "StudyGroupVisibility" NOT NULL DEFAULT 'PRIVATE';

-- Drop default after backfill so new rows must set type explicitly
ALTER TABLE "StudyGroup" ALTER COLUMN "type" DROP DEFAULT;
