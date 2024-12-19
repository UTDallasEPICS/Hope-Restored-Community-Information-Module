/*
  Warnings:

  - You are about to drop the column `personalId` on the `PhoneNumber` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `PhoneNumber` table. All the data in the column will be lost.
  - You are about to drop the `PersonalPhone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_personalId_fkey";

-- AlterTable
ALTER TABLE "PhoneNumber" DROP COLUMN "personalId",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "PersonalPhone";
