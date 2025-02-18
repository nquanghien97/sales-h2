/*
  Warnings:

  - Added the required column `imageName` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` ADD COLUMN `imageName` VARCHAR(191) NOT NULL;
