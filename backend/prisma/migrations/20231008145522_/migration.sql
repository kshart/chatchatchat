-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('public', 'private', 'external');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updateHash" VARCHAR(32) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "type" "ChatType" NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "ChatUser" (
    "userId" INTEGER NOT NULL,
    "chatGuid" UUID NOT NULL,
    "lastViewedMessageGuid" UUID,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("userId","chatGuid")
);

-- CreateTable
CREATE TABLE "Message" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatGuid" UUID NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "File" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "baseColor" VARCHAR(12),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "File_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "ImageScaled" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileGuid" UUID NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "baseColor" VARCHAR(12) NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ImageScaled_pkey" PRIMARY KEY ("guid")
);

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_chatGuid_fkey" FOREIGN KEY ("chatGuid") REFERENCES "Chat"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatGuid_fkey" FOREIGN KEY ("chatGuid") REFERENCES "Chat"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
