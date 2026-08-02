-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('Admin', 'User', 'Manager');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLES" NOT NULL DEFAULT 'User';
