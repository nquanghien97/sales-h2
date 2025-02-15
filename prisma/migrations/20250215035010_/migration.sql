/*
  Warnings:

  - The values [SalesPolicy,Products,ProductDocuments,Feedbacks] on the enum `files_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `files` MODIFY `category` ENUM('salesPolicy', 'products', 'productDocuments', 'feedbacks') NOT NULL;
