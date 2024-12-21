-- CreateEnum
CREATE TYPE "ResponseChoice" AS ENUM ('NO_RESPONSE', 'CANNOT_DETERMINE', 'YES', 'NO');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "auth0OrgId" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyObservation" (
    "id" SERIAL NOT NULL,
    "weekOf" TIMESTAMP(3) NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "WeeklyObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weeklyObservationId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "choice" "ResponseChoice" NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_auth0OrgId_key" ON "Organization"("auth0OrgId");

-- AddForeignKey
ALTER TABLE "WeeklyObservation" ADD CONSTRAINT "WeeklyObservation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_weeklyObservationId_fkey" FOREIGN KEY ("weeklyObservationId") REFERENCES "WeeklyObservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
