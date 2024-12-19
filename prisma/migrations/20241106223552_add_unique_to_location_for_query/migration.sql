/*
  Warnings:

  - A unique constraint covering the columns `[addressLine1]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_addressLine1_key" ON "Location"("addressLine1");
