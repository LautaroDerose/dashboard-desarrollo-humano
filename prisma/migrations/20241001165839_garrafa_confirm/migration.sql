-- AlterTable
ALTER TABLE `garrafasubsidy` ADD COLUMN `confirmed_at` DATETIME(3) NULL,
    ADD COLUMN `is_confirm` BOOLEAN NOT NULL DEFAULT false;
