/*
  Warnings:

  - You are about to drop the column `feedback` on the `insight_mother` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `insight_mother` table. All the data in the column will be lost.
  - You are about to drop the column `product_documents` on the `insight_mother` table. All the data in the column will be lost.
  - You are about to drop the column `sales_policy` on the `insight_mother` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `insight_mother` DROP COLUMN `feedback`,
    DROP COLUMN `product`,
    DROP COLUMN `product_documents`,
    DROP COLUMN `sales_policy`;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `category` ENUM('SalesPolicy', 'Products', 'ProductDocuments', 'Feedbacks') NOT NULL,
    `authorId` INTEGER NOT NULL,
    `insightMotherId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_insightMotherId_fkey` FOREIGN KEY (`insightMotherId`) REFERENCES `insight_mother`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
