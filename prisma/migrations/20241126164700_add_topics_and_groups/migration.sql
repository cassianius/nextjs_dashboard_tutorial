-- CreateEnum
CREATE TYPE "TopicCategory" AS ENUM ('TECHNICAL_EXPERTISE', 'PROBLEM_SOLVING', 'LEADERSHIP', 'COMMUNICATION', 'PROJECT_EXECUTION', 'DOMAIN_KNOWLEDGE', 'ADAPTABILITY', 'INNOVATION');

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "topic" "TopicCategory" NOT NULL,
    "goal" TEXT NOT NULL,
    "probe_level" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicGroup" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TopicGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TopicToTopicGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TopicToTopicGroup_AB_unique" ON "_TopicToTopicGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicToTopicGroup_B_index" ON "_TopicToTopicGroup"("B");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicGroup" ADD CONSTRAINT "TopicGroup_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToTopicGroup" ADD CONSTRAINT "_TopicToTopicGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToTopicGroup" ADD CONSTRAINT "_TopicToTopicGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TopicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
