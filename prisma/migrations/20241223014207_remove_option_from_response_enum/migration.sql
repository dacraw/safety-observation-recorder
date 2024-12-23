/*
  Warnings:

  - The values [NO_RESPONSE] on the enum `ResponseChoice` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResponseChoice_new" AS ENUM ('CANNOT_DETERMINE', 'YES', 'NO');
ALTER TABLE "Response" ALTER COLUMN "choice" TYPE "ResponseChoice_new" USING ("choice"::text::"ResponseChoice_new");
ALTER TYPE "ResponseChoice" RENAME TO "ResponseChoice_old";
ALTER TYPE "ResponseChoice_new" RENAME TO "ResponseChoice";
DROP TYPE "ResponseChoice_old";
COMMIT;
