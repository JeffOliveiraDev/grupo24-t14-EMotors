-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "telephone" VARCHAR(11) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "acoountType" BOOLEAN NOT NULL,
    "password" VARCHAR(200) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "cardsImage" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcement" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "fuel" TEXT NOT NULL,
    "mileage" VARCHAR(20) NOT NULL,
    "color" VARCHAR(15) NOT NULL,
    "pfipe" BOOLEAN NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "detailsImage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
