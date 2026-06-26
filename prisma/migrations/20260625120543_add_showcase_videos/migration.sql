-- CreateTable
CREATE TABLE "ShowcaseVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "badgeText" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ShowcaseVideo_pkey" PRIMARY KEY ("id")
);
