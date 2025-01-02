/*
  Warnings:

  - You are about to drop the column `resetPasswordExpiresAt` on the `Citizen` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `Citizen` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `Citizen` table. All the data in the column will be lost.
  - You are about to drop the column `verificationTokenExpiresAt` on the `Citizen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Citizen" DROP COLUMN "resetPasswordExpiresAt",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "verificationToken",
DROP COLUMN "verificationTokenExpiresAt",
ADD COLUMN     "OTP" TEXT,
ADD COLUMN     "OTPExpiresAt" TIMESTAMP(3);
