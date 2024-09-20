/*
  Warnings:

  - You are about to drop the column `status` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `garrafasubsidy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `garrafasubsidy` DROP COLUMN `delivery_date`;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `status_type_id` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Status_assignment_id_key`(`assignment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StatusType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_status_type_id_fkey` FOREIGN KEY (`status_type_id`) REFERENCES `StatusType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
