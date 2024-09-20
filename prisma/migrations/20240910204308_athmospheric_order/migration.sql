-- CreateTable
CREATE TABLE `AtmosphericOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `desired_service_date` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `payment_confirmed` BOOLEAN NOT NULL,
    `payment_date` DATETIME(3) NULL,
    `complication_desc` VARCHAR(191) NULL,
    `task_confirmed` BOOLEAN NULL,
    `task_date` DATETIME(3) NULL,

    UNIQUE INDEX `AtmosphericOrder_assignment_id_key`(`assignment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AtmosphericOrder` ADD CONSTRAINT `AtmosphericOrder_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
