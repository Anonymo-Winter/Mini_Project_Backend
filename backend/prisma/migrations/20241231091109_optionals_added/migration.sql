/*
  Warnings:

  - You are about to drop the column `verficationToken` on the `Authority` table. All the data in the column will be lost.
  - You are about to drop the column `verficationToken` on the `Citizen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Authority" DROP COLUMN "verficationToken";

-- AlterTable
ALTER TABLE "Citizen" DROP COLUMN "verficationToken";
