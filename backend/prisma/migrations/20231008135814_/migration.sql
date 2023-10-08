-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "ChatUser" (
    "userId" INTEGER NOT NULL,
    "chatGuid" UUID NOT NULL,
    "lastViewedMessageId" TEXT NOT NULL,
    "lastViewedAt" TEXT NOT NULL,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("userId","chatGuid")
);

-- CreateTable
CREATE TABLE "Message" (
    "guid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatGuid" UUID NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_chatGuid_fkey" FOREIGN KEY ("chatGuid") REFERENCES "Chat"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatGuid_fkey" FOREIGN KEY ("chatGuid") REFERENCES "Chat"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
