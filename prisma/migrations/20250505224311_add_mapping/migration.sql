/*
  Warnings:

  - You are about to drop the column `property_Id` on the `Rent` table. All the data in the column will be lost.
  - You are about to drop the column `property_Id` on the `Review` table. All the data in the column will be lost.
  - Added the required column `property_id` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rent" DROP CONSTRAINT "Rent_property_Id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_property_Id_fkey";

-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "property_Id",
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "property_Id",
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
