-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_family_group_id_fkey`;

-- AlterTable
ALTER TABLE `recipient` MODIFY `family_group_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_family_group_id_fkey` FOREIGN KEY (`family_group_id`) REFERENCES `FamilyGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
