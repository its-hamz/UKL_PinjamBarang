/*
  Warnings:

  - You are about to drop the column `actualReturnDate` on the `borrow` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrow` DROP COLUMN `actualReturnDate`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('admin', 'user') NOT NULL;

-- CreateTable
CREATE TABLE `returnRecord` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
