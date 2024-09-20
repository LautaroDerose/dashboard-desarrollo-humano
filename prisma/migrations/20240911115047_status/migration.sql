-- CreateTable
CREATE TABLE `GarrafaSubsidy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `provider_name` VARCHAR(191) NOT NULL,
    `verification_dni` INTEGER NOT NULL,
    `delivery_date` DATETIME(3) NULL,

    UNIQUE INDEX `GarrafaSubsidy_assignment_id_key`(`assignment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GarrafaSubsidy` ADD CONSTRAINT `GarrafaSubsidy_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
