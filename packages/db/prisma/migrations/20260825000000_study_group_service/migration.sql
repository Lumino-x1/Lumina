-- CreateEnum
CREATE TYPE "StudyGroupMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "StudyGroupInvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "StudyGroup" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "StudyGroup" ADD COLUMN "chatChannelId" TEXT;
ALTER TABLE "StudyGroup" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StudyGroupMember" ADD COLUMN "role" "StudyGroupMemberRole" NOT NULL DEFAULT 'MEMBER';
ALTER TABLE "StudyGroupMember" ADD COLUMN "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "StudyGroupMember" AS m
SET "role" = 'OWNER'
FROM "StudyGroup" AS g
WHERE m."studyGroupId" = g."id" AND m."userId" = g."ownerId";

CREATE INDEX "StudyGroup_ownerId_idx" ON "StudyGroup"("ownerId");
CREATE INDEX "StudyGroup_name_idx" ON "StudyGroup"("name");
CREATE INDEX "StudyGroup_subject_idx" ON "StudyGroup"("subject");
CREATE INDEX "StudyGroupMember_userId_idx" ON "StudyGroupMember"("userId");

-- CreateTable
CREATE TABLE "StudyGroupInvitation" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "inviteeId" TEXT NOT NULL,
    "message" TEXT,
    "status" "StudyGroupInvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGroupInvitation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyGroupInvitation_studyGroupId_inviteeId_key" ON "StudyGroupInvitation"("studyGroupId", "inviteeId");
CREATE INDEX "StudyGroupInvitation_inviteeId_status_idx" ON "StudyGroupInvitation"("inviteeId", "status");

ALTER TABLE "StudyGroupInvitation" ADD CONSTRAINT "StudyGroupInvitation_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupInvitation" ADD CONSTRAINT "StudyGroupInvitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StudyGroupInvitation" ADD CONSTRAINT "StudyGroupInvitation_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupDiscussion" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyGroupDiscussion_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "StudyGroupDiscussion_studyGroupId_createdAt_idx" ON "StudyGroupDiscussion"("studyGroupId", "createdAt");
ALTER TABLE "StudyGroupDiscussion" ADD CONSTRAINT "StudyGroupDiscussion_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupDiscussion" ADD CONSTRAINT "StudyGroupDiscussion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupDiscussionReply" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyGroupDiscussionReply_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "StudyGroupDiscussionReply_discussionId_createdAt_idx" ON "StudyGroupDiscussionReply"("discussionId", "createdAt");
ALTER TABLE "StudyGroupDiscussionReply" ADD CONSTRAINT "StudyGroupDiscussionReply_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "StudyGroupDiscussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupDiscussionReply" ADD CONSTRAINT "StudyGroupDiscussionReply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupNote" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyGroupNote_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "StudyGroupNote_studyGroupId_updatedAt_idx" ON "StudyGroupNote"("studyGroupId", "updatedAt");
ALTER TABLE "StudyGroupNote" ADD CONSTRAINT "StudyGroupNote_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupNote" ADD CONSTRAINT "StudyGroupNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupNoteVersion" (
    "id" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "editorId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGroupNoteVersion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyGroupNoteVersion_noteId_version_key" ON "StudyGroupNoteVersion"("noteId", "version");
CREATE INDEX "StudyGroupNoteVersion_noteId_idx" ON "StudyGroupNoteVersion"("noteId");
ALTER TABLE "StudyGroupNoteVersion" ADD CONSTRAINT "StudyGroupNoteVersion_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "StudyGroupNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupNoteVersion" ADD CONSTRAINT "StudyGroupNoteVersion_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupFile" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGroupFile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyGroupFile_key_key" ON "StudyGroupFile"("key");
CREATE INDEX "StudyGroupFile_studyGroupId_createdAt_idx" ON "StudyGroupFile"("studyGroupId", "createdAt");
ALTER TABLE "StudyGroupFile" ADD CONSTRAINT "StudyGroupFile_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupFile" ADD CONSTRAINT "StudyGroupFile_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupTimetable" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyGroupTimetable_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyGroupTimetable_studyGroupId_key" ON "StudyGroupTimetable"("studyGroupId");
ALTER TABLE "StudyGroupTimetable" ADD CONSTRAINT "StudyGroupTimetable_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupTimetableVersion" (
    "id" TEXT NOT NULL,
    "timetableId" TEXT NOT NULL,
    "editorId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGroupTimetableVersion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyGroupTimetableVersion_timetableId_version_key" ON "StudyGroupTimetableVersion"("timetableId", "version");
ALTER TABLE "StudyGroupTimetableVersion" ADD CONSTRAINT "StudyGroupTimetableVersion_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "StudyGroupTimetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupTimetableVersion" ADD CONSTRAINT "StudyGroupTimetableVersion_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "StudyGroupAuditEvent" (
    "id" TEXT NOT NULL,
    "studyGroupId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGroupAuditEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "StudyGroupAuditEvent_studyGroupId_createdAt_idx" ON "StudyGroupAuditEvent"("studyGroupId", "createdAt");
ALTER TABLE "StudyGroupAuditEvent" ADD CONSTRAINT "StudyGroupAuditEvent_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyGroupAuditEvent" ADD CONSTRAINT "StudyGroupAuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
