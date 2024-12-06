/*
  Warnings:

  - You are about to drop the `borrow` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[borrowId]` on the table `returnRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `borrowId` to the `returnRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `borrow` DROP FOREIGN KEY `borrow_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `borrow` DROP FOREIGN KEY `borrow_userId_fkey`;

-- AlterTable
ALTER TABLE `returnrecord` ADD COLUMN `borrowId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `borrow`;

-- CreateTable
CREATE TABLE `borrowRecord` (
    `borrowId` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL DEFAULT 0,
    `borrowDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`borrowId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `returnRecord_borrowId_key` ON `returnRecord`(`borrowId`);

-- AddForeignKey
ALTER TABLE `borrowRecord` ADD CONSTRAINT `borrowRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrowRecord` ADD CONSTRAINT `borrowRecord_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_borrowId_fkey` FOREIGN KEY (`borrowId`) REFERENCES `borrowRecord`(`borrowId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
