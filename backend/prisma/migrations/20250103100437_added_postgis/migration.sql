/*
  Warnings:

  - You are about to drop the column `code` on the `Office` table. All the data in the column will be lost.
  - Added the required column `location` to the `Office` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Office_code_key";

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "code",
ADD COLUMN     "location" TEXT NOT NULL;
