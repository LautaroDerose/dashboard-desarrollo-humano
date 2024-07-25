/*
  Warnings:

  - Added the required column `family_group_id` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignment` MODIFY `quantity` INTEGER NULL,
    MODIFY `amount` INTEGER NULL;

-- AlterTable
ALTER TABLE `recipient` ADD COLUMN `family_group_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Observation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recipient_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilyGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_family_group_id_fkey` FOREIGN KEY (`family_group_id`) REFERENCES `FamilyGroup`(`id`)  ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`)  ON UPDATE CASCADE;
