-- DropForeignKey
ALTER TABLE `files` DROP FOREIGN KEY `files_fileCategorySlug_fkey`;

-- DropIndex
DROP INDEX `files_fileCategorySlug_fkey` ON `files`;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_fileCategorySlug_fkey` FOREIGN KEY (`fileCategorySlug`) REFERENCES `file_categories`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
