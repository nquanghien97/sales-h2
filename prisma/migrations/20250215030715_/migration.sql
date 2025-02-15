/*
  Warnings:

  - You are about to drop the column `category` on the `insight_mother` table. All the data in the column will be lost.
  - Added the required column `keyword` to the `insight_mother` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `insight_mother` DROP COLUMN `category`,
    ADD COLUMN `keyword` VARCHAR(191) NOT NULL;
