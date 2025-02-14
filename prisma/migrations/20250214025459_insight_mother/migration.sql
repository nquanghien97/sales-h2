/*
  Warnings:

  - You are about to drop the `handlerejection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `handlerejection` DROP FOREIGN KEY `handlerejection_authorId_fkey`;

-- DropTable
DROP TABLE `handlerejection`;

-- CreateTable
CREATE TABLE `insight_mother` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `sales_policy` VARCHAR(191) NULL,
    `product` VARCHAR(191) NULL,
    `product_documents` VARCHAR(191) NULL,
    `feedback` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `insight_mother` ADD CONSTRAINT `insight_mother_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
