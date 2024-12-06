/*
  Warnings:

  - The primary key for the `borrow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `borrow` table. All the data in the column will be lost.
  - Added the required column `BorrowId` to the `borrow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrow` DROP PRIMARY KEY,
    DROP COLUMN `Id`,
    ADD COLUMN `BorrowId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`BorrowId`);
