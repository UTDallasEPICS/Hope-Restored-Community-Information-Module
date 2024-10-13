/*
  Warnings:

  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_groupsId_fkey";

-- DropTable
DROP TABLE "Groups";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
