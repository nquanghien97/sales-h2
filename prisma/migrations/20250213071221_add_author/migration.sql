-- AddForeignKey
ALTER TABLE `handlerejection` ADD CONSTRAINT `handlerejection_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
