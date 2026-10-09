DO $$
BEGIN
    IF to_regclass('"AuthVerification"') IS NOT NULL
       AND to_regclass('"verification"') IS NULL THEN
        ALTER TABLE "AuthVerification" RENAME TO "verification";
    END IF;
END $$;
