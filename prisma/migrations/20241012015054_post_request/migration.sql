/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Demographic` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `resourceID` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the `ExternalLinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demographic" DROP CONSTRAINT "Demographic_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ExternalLinks" DROP CONSTRAINT "ExternalLinks_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_resourceID_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_resourceId_fkey";

-- DropIndex
DROP INDEX "Groups_resourceId_key";

-- DropIndex
DROP INDEX "Language_resourceID_key";

-- DropIndex
DROP INDEX "PhoneNumber_resourceId_key";

-- AlterTable
ALTER TABLE "Demographic" DROP COLUMN "resourceId";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "resourceId";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "resourceID";

-- DropTable
DROP TABLE "ExternalLinks";

-- DropTable
DROP TABLE "Resources";

-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eligibility" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "externalLink" TEXT NOT NULL,
    "groupsId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LanguageToResource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DemographicToResource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToResource_AB_unique" ON "_LanguageToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToResource_B_index" ON "_LanguageToResource"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemographicToResource_AB_unique" ON "_DemographicToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_DemographicToResource_B_index" ON "_DemographicToResource"("B");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneNumber" ADD CONSTRAINT "PhoneNumber_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToResource" ADD CONSTRAINT "_LanguageToResource_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToResource" ADD CONSTRAINT "_LanguageToResource_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographicToResource" ADD CONSTRAINT "_DemographicToResource_A_fkey" FOREIGN KEY ("A") REFERENCES "Demographic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographicToResource" ADD CONSTRAINT "_DemographicToResource_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
