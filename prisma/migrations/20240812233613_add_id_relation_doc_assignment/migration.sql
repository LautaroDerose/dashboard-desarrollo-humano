-- AlterTable
ALTER TABLE `doc` ADD COLUMN `assignment_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Doc` ADD CONSTRAINT `Doc_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
