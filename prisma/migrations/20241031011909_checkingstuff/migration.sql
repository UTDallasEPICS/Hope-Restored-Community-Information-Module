/*
  Warnings:

  - You are about to drop the `personal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_personalId_fkey";

-- DropTable
DROP TABLE "personal";

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhoneNumber" ADD CONSTRAINT "PhoneNumber_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
