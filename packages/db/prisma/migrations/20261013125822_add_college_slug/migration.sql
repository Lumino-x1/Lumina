-- Drop the old index
DROP INDEX IF EXISTS "College_domain_idx";

-- Add new columns as nullable where existing rows need backfilling
ALTER TABLE "College"
ADD COLUMN "description" TEXT,
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "slug" TEXT;

-- Populate country for existing records
UPDATE "College"
SET "country" = 'India'
WHERE "country" IS NULL;

-- Generate slugs from existing college names
UPDATE "College"
SET "slug" = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            TRIM("name"),
            '[^a-zA-Z0-9]+',
            '-',
            'g'
        ),
        '(^-+|-+$)',
        '',
        'g'
    )
)
WHERE "slug" IS NULL;

-- Ensure generated slugs are unique
WITH duplicates AS (
    SELECT
        "id",
        "slug",
        ROW_NUMBER() OVER (
            PARTITION BY "slug"
            ORDER BY "id"
        ) AS row_num
    FROM "College"
)
UPDATE "College" AS c
SET "slug" = c."slug" || '-' || LEFT(c."id", 6)
FROM duplicates AS d
WHERE c."id" = d."id"
  AND d.row_num > 1;

-- Make required columns non-null
ALTER TABLE "College"
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'India';

-- Create the CollegeEmailDomain table
CREATE TABLE "CollegeEmailDomain" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollegeEmailDomain_pkey"
    PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX "CollegeEmailDomain_domain_key"
ON "CollegeEmailDomain"("domain");

CREATE INDEX "CollegeEmailDomain_collegeId_idx"
ON "CollegeEmailDomain"("collegeId");

CREATE UNIQUE INDEX "College_slug_key"
ON "College"("slug");

CREATE INDEX "College_name_idx"
ON "College"("name");

CREATE INDEX "College_city_idx"
ON "College"("city");

CREATE INDEX "College_state_idx"
ON "College"("state");

-- Add foreign key
ALTER TABLE "CollegeEmailDomain"
ADD CONSTRAINT "CollegeEmailDomain_collegeId_fkey"
FOREIGN KEY ("collegeId")
REFERENCES "College"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;