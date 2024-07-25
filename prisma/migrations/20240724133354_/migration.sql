/*
  Warnings:

  - Made the column `family_group_id` on table `recipient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_family_group_id_fkey`;

-- AlterTable
ALTER TABLE `recipient` MODIFY `family_group_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_family_group_id_fkey` FOREIGN KEY (`family_group_id`) REFERENCES `FamilyGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
