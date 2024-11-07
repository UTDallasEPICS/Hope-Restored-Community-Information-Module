/*
  Warnings:

  - You are about to drop the column `groupsId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the `Personal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_groupsId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "groupsId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Personal";

-- CreateTable
CREATE TABLE "PersonalPhone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PersonalPhone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneNumber" ADD CONSTRAINT "PhoneNumber_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "PersonalPhone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
