/*
  Warnings:

  - Added the required column `authorId` to the `handlerejection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `handlerejection` ADD COLUMN `authorId` INTEGER NOT NULL;
