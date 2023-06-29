-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments_on_announcement" (
    "id" TEXT NOT NULL,
    "commentsId" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,

    CONSTRAINT "comments_on_announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_on_announcement" ADD CONSTRAINT "comments_on_announcement_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_on_announcement" ADD CONSTRAINT "comments_on_announcement_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
