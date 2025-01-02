-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'RESOLVED');

-- CreateTable
CREATE TABLE "Citizen" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verficationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiresAt" TIMESTAMP(3),
    "verificationToken" TEXT,
    "verificationTokenExpiresAt" TIMESTAMP(3),
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL DEFAULT 'https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg',

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authority" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verficationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiresAt" TIMESTAMP(3),
    "verificationToken" TEXT,
    "verificationTokenExpiresAt" TIMESTAMP(3),
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL DEFAULT 'https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg',

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_phone_key" ON "Citizen"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_email_key" ON "Authority"("email");
