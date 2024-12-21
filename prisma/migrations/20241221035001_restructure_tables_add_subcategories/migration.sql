/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyObservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subcategoryId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_weeklyObservationId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyObservation" DROP CONSTRAINT "WeeklyObservation_organizationId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sectionId",
ADD COLUMN     "subcategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "WeeklyObservation";

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "weekOf" TIMESTAMP(3) NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "observationId" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "Observation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
