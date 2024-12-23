/*
  Warnings:

  - Added the required column `userId` to the `Observation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observationId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Observation" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "observationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "Observation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
