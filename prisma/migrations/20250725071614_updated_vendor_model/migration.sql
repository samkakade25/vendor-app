/*
  Warnings:

  - The primary key for the `Vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAccountNo` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vendor_email_key";

-- AlterTable
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "addressLine1" TEXT NOT NULL,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "bankAccountNo" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vendorName" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vendor_id_seq";
