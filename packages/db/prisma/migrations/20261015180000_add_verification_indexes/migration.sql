-- CreateIndex
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "verification_expiresAt_idx" ON "verification"("expiresAt");
