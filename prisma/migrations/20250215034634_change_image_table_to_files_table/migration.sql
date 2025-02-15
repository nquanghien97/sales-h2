/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_insightMotherId_fkey`;

-- DropTable
DROP TABLE `image`;

-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `category` ENUM('SalesPolicy', 'Products', 'ProductDocuments', 'Feedbacks') NOT NULL,
    `authorId` INTEGER NOT NULL,
    `insightMotherId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_insightMotherId_fkey` FOREIGN KEY (`insightMotherId`) REFERENCES `insight_mother`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
