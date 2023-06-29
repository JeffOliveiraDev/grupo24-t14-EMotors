/*
  Warnings:

  - You are about to drop the `comments_on_announcement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `announcementId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments_on_announcement" DROP CONSTRAINT "comments_on_announcement_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "comments_on_announcement" DROP CONSTRAINT "comments_on_announcement_commentsId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "announcementId" TEXT NOT NULL;

-- DropTable
DROP TABLE "comments_on_announcement";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
