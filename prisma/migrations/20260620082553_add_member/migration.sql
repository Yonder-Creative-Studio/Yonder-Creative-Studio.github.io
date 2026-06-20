-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "expertise" TEXT[],
    "websiteUrl" TEXT,
    "imgSrc" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
