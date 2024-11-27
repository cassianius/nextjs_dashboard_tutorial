/*
  Warnings:

  - You are about to drop the column `topics` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the `TopicGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TopicToTopicGroup` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `topic` on the `Topic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TopicCategory" AS ENUM ('TECHNICAL_EXPERTISE', 'PROBLEM_SOLVING', 'LEADERSHIP', 'COMMUNICATION', 'PROJECT_EXECUTION', 'DOMAIN_KNOWLEDGE', 'ADAPTABILITY', 'INNOVATION');

-- DropForeignKey
ALTER TABLE "TopicGroup" DROP CONSTRAINT "TopicGroup_account_id_fkey";

-- DropForeignKey
ALTER TABLE "_TopicToTopicGroup" DROP CONSTRAINT "_TopicToTopicGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_TopicToTopicGroup" DROP CONSTRAINT "_TopicToTopicGroup_B_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "topic",
ADD COLUMN     "topic" "TopicCategory" NOT NULL;

-- AlterTable
ALTER TABLE "interviews" DROP COLUMN "topics";

-- DropTable
DROP TABLE "TopicGroup";

-- DropTable
DROP TABLE "_TopicToTopicGroup";

-- DropEnum
DROP TYPE "TopicCategory";

-- CreateTable
CREATE TABLE "_InterviewToTopic" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InterviewToTopic_AB_unique" ON "_InterviewToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_InterviewToTopic_B_index" ON "_InterviewToTopic"("B");

-- AddForeignKey
ALTER TABLE "_InterviewToTopic" ADD CONSTRAINT "_InterviewToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToTopic" ADD CONSTRAINT "_InterviewToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
