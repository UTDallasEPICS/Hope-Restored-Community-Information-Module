-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_resourceId_fkey";

-- AlterTable
ALTER TABLE "Resources" ALTER COLUMN "eligibility" SET DEFAULT false,
ALTER COLUMN "cost" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "_ResourcesToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResourcesToTags_AB_unique" ON "_ResourcesToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourcesToTags_B_index" ON "_ResourcesToTags"("B");

-- AddForeignKey
ALTER TABLE "_ResourcesToTags" ADD CONSTRAINT "_ResourcesToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourcesToTags" ADD CONSTRAINT "_ResourcesToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
