-- CreateTable
CREATE TABLE `SubsidyStage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `note_doc_id` INTEGER NULL,
    `decree_doc_id` INTEGER NULL,
    `expense_doc_id` INTEGER NULL,
    `payment_doc_id` INTEGER NULL,
    `check_doc_id` INTEGER NULL,
    `all_confirmed_data` DATETIME(3) NULL,

    UNIQUE INDEX `SubsidyStage_assignment_id_key`(`assignment_id`),
    UNIQUE INDEX `SubsidyStage_note_doc_id_key`(`note_doc_id`),
    UNIQUE INDEX `SubsidyStage_decree_doc_id_key`(`decree_doc_id`),
    UNIQUE INDEX `SubsidyStage_expense_doc_id_key`(`expense_doc_id`),
    UNIQUE INDEX `SubsidyStage_payment_doc_id_key`(`payment_doc_id`),
    UNIQUE INDEX `SubsidyStage_check_doc_id_key`(`check_doc_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_type` ENUM('NOTE_DOC', 'DECREE_DOC', 'EXPENSE_DOC', 'PAYMENT_RECEIPT_DOC', 'CHECK_DOC') NOT NULL,
    `doc_number` VARCHAR(191) NOT NULL,
    `doc_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_confirm` BOOLEAN NOT NULL DEFAULT false,
    `confirmed_at` DATETIME(3) NULL,
    `subsidy_stage_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_note_doc_id_fkey` FOREIGN KEY (`note_doc_id`) REFERENCES `Doc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_decree_doc_id_fkey` FOREIGN KEY (`decree_doc_id`) REFERENCES `Doc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_expense_doc_id_fkey` FOREIGN KEY (`expense_doc_id`) REFERENCES `Doc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_payment_doc_id_fkey` FOREIGN KEY (`payment_doc_id`) REFERENCES `Doc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubsidyStage` ADD CONSTRAINT `SubsidyStage_check_doc_id_fkey` FOREIGN KEY (`check_doc_id`) REFERENCES `Doc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doc` ADD CONSTRAINT `Doc_subsidy_stage_id_fkey` FOREIGN KEY (`subsidy_stage_id`) REFERENCES `SubsidyStage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
