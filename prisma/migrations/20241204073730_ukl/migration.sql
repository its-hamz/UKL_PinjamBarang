/*
  Warnings:

  - Added the required column `actualReturnDate` to the `returnRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `returnrecord` ADD COLUMN `actualReturnDate` DATETIME(3) NOT NULL;
