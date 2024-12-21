/*
  Warnings:

  - You are about to drop the column `observationId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `plantId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_observationId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "observationId",
ADD COLUMN     "plantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
