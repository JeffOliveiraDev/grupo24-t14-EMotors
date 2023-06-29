/*
  Warnings:

  - You are about to drop the column `birthdate` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthdate",
ADD COLUMN     "birthDate" VARCHAR(10) NOT NULL;
