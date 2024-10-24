-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_personalId_fkey";

-- AlterTable
ALTER TABLE "PhoneNumber" ALTER COLUMN "personalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PhoneNumber" ADD CONSTRAINT "PhoneNumber_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
