-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "pfipe" BOOLEAN NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "detailsImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
