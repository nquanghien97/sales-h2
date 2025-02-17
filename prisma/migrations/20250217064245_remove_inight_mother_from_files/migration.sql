-- DropForeignKey
ALTER TABLE `files` DROP FOREIGN KEY `files_insightMotherId_fkey`;

-- DropIndex
DROP INDEX `files_insightMotherId_fkey` ON `files`;
