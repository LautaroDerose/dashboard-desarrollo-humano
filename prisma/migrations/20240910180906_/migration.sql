/*
  Warnings:

  - You are about to drop the column `is_complete` on the `watersubsidy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `watersubsidy` DROP COLUMN `is_complete`,
    ADD COLUMN `is_completed` BOOLEAN NULL;
