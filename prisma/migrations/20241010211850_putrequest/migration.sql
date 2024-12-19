/*
  Warnings:

  - You are about to drop the `_ResourcesToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ResourcesToTags" DROP CONSTRAINT "_ResourcesToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResourcesToTags" DROP CONSTRAINT "_ResourcesToTags_B_fkey";

-- AlterTable
ALTER TABLE "Resources" ALTER COLUMN "eligibility" DROP DEFAULT,
ALTER COLUMN "cost" DROP DEFAULT;

-- DropTable
DROP TABLE "_ResourcesToTags";

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
