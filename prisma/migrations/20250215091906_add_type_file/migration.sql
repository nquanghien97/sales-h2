-- AlterTable
ALTER TABLE `files` ADD COLUMN `type` ENUM('image', 'video') NULL;
