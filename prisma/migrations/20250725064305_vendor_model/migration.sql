/*
  Warnings:

  - The primary key for the `Vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressLine1` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `bankAccountNo` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `vendorName` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Vendor` table. All the data in the column will be lost.
  - The `id` column on the `Vendor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_pkey",
DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
DROP COLUMN "bankAccountNo",
DROP COLUMN "bankName",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "updatedAt",
DROP COLUMN "vendorName",
DROP COLUMN "zipCode",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
