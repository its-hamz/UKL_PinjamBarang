/*
  Warnings:

  - You are about to drop the column `itemStatus` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `itemStatus`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';
