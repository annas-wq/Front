generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
-- CreateTable
CREATE TABLE "superheroes" (
    "id" SERIAL NOT NULL,
    "hero_name" VARCHAR(50) NOT NULL,
    "real_name" VARCHAR(50) NOT NULL,
    "powers" TEXT NOT NULL,
    "universe" VARCHAR(20),
    "first_appearance" INTEGER,

    CONSTRAINT "superheroes_pkey" PRIMARY KEY ("id")
);
