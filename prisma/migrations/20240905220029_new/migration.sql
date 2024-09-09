-- CreateTable
CREATE TABLE `BenefitCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Benefit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `dni` INTEGER NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `enrollment_date` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `family_group_id` INTEGER NULL,

    UNIQUE INDEX `Recipient_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_active` BOOLEAN NOT NULL,
    `recipient_id` INTEGER NOT NULL,
    `assignment_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilyGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipient_id` INTEGER NOT NULL,
    `phone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `street_id` INTEGER NOT NULL,
    `street_number` VARCHAR(191) NOT NULL,
    `locality_id` INTEGER NOT NULL,

    UNIQUE INDEX `ContactInfo_recipient_id_key`(`recipient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialCondition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gravity` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipientSocialCondition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipient_id` INTEGER NOT NULL,
    `social_condition_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Street` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `locality_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `assignment_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HospitalCredential` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `ts_name` VARCHAR(191) NOT NULL,
    `visiting_shift` VARCHAR(191) NULL,
    `visit_date` DATE NULL,
    `visit_status` VARCHAR(191) NULL,
    `visit_confirm` BOOLEAN NULL,
    `report_soc_eco_issued` BOOLEAN NULL,
    `report_soc_eco_issue_date` DATETIME(3) NULL,
    `report_soc_eco_received` BOOLEAN NULL,
    `report_soc_eco_receive_date` DATETIME(3) NULL,
    `credential_number` VARCHAR(191) NULL,

    UNIQUE INDEX `HospitalCredential_assignment_id_key`(`assignment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterSubsidy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `supply_number` VARCHAR(191) NOT NULL,
    `supply_value` DOUBLE NOT NULL,
    `period` VARCHAR(191) NULL,
    `value_assignment` DOUBLE NOT NULL,

    UNIQUE INDEX `WaterSubsidy_assignment_id_key`(`assignment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `benefit_id` INTEGER NOT NULL,
    `detail_benefit` VARCHAR(191) NULL,
    `recipient_id` INTEGER NOT NULL,
    `quantity` INTEGER NULL,
    `amount` INTEGER NULL,
    `status` VARCHAR(191) NULL,
    `enrollment_date` DATETIME(3) NULL,
    `expiry_date` DATETIME(3) NULL,
    `withdrawal_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelSubsidy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_id` INTEGER NOT NULL,
    `destination1` VARCHAR(191) NOT NULL,
    `date1` DATETIME(3) NOT NULL,
    `passenger_type1` VARCHAR(191) NOT NULL,
    `name1` VARCHAR(191) NOT NULL,
    `dni1` INTEGER NOT NULL,
    `amount1` DOUBLE NOT NULL,
    `provider1` VARCHAR(191) NOT NULL,
    `destination2` VARCHAR(191) NULL,
    `date2` DATETIME(3) NULL,
    `passenger_type2` VARCHAR(191) NULL,
    `name2` VARCHAR(191) NULL,
    `dni2` INTEGER NULL,
    `amount2` DOUBLE NULL,
    `provider2` VARCHAR(191) NULL,
    `destination3` VARCHAR(191) NULL,
    `date3` DATETIME(3) NULL,
    `passenger_type3` VARCHAR(191) NULL,
    `name3` VARCHAR(191) NULL,
    `dni3` INTEGER NULL,
    `amount3` DOUBLE NULL,
    `provider3` VARCHAR(191) NULL,
    `destination4` VARCHAR(191) NULL,
    `date4` DATETIME(3) NULL,
    `passenger_type4` VARCHAR(191) NULL,
    `name4` VARCHAR(191) NULL,
    `dni4` INTEGER NULL,
    `amount4` DOUBLE NULL,
    `provider4` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('user', 'admin', 'subsecretaria', 'contaduria', 'tesoreria', 'caja', 'trabajador_social', 'provedor') NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Benefit` ADD CONSTRAINT `Benefit_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `BenefitCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_family_group_id_fkey` FOREIGN KEY (`family_group_id`) REFERENCES `FamilyGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_street_id_fkey` FOREIGN KEY (`street_id`) REFERENCES `Street`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_locality_id_fkey` FOREIGN KEY (`locality_id`) REFERENCES `Locality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipientSocialCondition` ADD CONSTRAINT `RecipientSocialCondition_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipientSocialCondition` ADD CONSTRAINT `RecipientSocialCondition_social_condition_id_fkey` FOREIGN KEY (`social_condition_id`) REFERENCES `SocialCondition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Street` ADD CONSTRAINT `Street_locality_id_fkey` FOREIGN KEY (`locality_id`) REFERENCES `Locality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Doc` ADD CONSTRAINT `Doc_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HospitalCredential` ADD CONSTRAINT `HospitalCredential_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterSubsidy` ADD CONSTRAINT `WaterSubsidy_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `Benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelSubsidy` ADD CONSTRAINT `TravelSubsidy_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
