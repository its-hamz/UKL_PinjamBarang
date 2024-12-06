/*
  Warnings:

  - The values [success,failed] on the enum `borrow_borrowStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `borrow` MODIFY `borrowStatus` ENUM('late', 'onTime') NOT NULL;
