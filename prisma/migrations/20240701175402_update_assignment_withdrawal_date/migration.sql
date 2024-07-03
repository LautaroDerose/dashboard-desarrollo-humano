/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `socialcondition` table. All the data in the column will be lost.
  - You are about to drop the `riskfactor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `riskfactor` DROP FOREIGN KEY `RiskFactor_recipient_id_fkey`;

-- DropForeignKey
ALTER TABLE `socialcondition` DROP FOREIGN KEY `SocialCondition_recipient_id_fkey`;

-- AlterTable
ALTER TABLE `socialcondition` DROP COLUMN `recipient_id`;

-- DropTable
DROP TABLE `riskfactor`;

-- CreateTable
CREATE TABLE `RecipientSocialCondition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipient_id` INTEGER NOT NULL,
    `social_condition_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecipientSocialCondition` ADD CONSTRAINT `RecipientSocialCondition_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipientSocialCondition` ADD CONSTRAINT `RecipientSocialCondition_social_condition_id_fkey` FOREIGN KEY (`social_condition_id`) REFERENCES `SocialCondition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
