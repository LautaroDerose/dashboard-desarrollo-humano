/*
  Warnings:

  - You are about to drop the column `amount` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `familyName` on the `familygroup` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentDate` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `familyGroupId` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `localityId` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `streetId` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `localityId` on the `street` table. All the data in the column will be lost.
  - You are about to drop the `_benefitrecipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_recipienttoriskfactor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_recipienttosocialcondition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Benefit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Benefit` table without a default value. This is not possible if the table is not empty.
  - Made the column `provider` on table `benefit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `family_name` to the `FamilyGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment_date` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family_group_id` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_id` to the `RiskFactor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_id` to the `SocialCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality_id` to the `Street` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_benefitrecipient` DROP FOREIGN KEY `_BenefitRecipient_A_fkey`;

-- DropForeignKey
ALTER TABLE `_benefitrecipient` DROP FOREIGN KEY `_BenefitRecipient_B_fkey`;

-- DropForeignKey
ALTER TABLE `_recipienttoriskfactor` DROP FOREIGN KEY `_RecipientToRiskFactor_A_fkey`;

-- DropForeignKey
ALTER TABLE `_recipienttoriskfactor` DROP FOREIGN KEY `_RecipientToRiskFactor_B_fkey`;

-- DropForeignKey
ALTER TABLE `_recipienttosocialcondition` DROP FOREIGN KEY `_RecipientToSocialCondition_A_fkey`;

-- DropForeignKey
ALTER TABLE `_recipienttosocialcondition` DROP FOREIGN KEY `_RecipientToSocialCondition_B_fkey`;

-- DropForeignKey
ALTER TABLE `benefit` DROP FOREIGN KEY `Benefit_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_familyGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_localityId_fkey`;

-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_streetId_fkey`;

-- DropForeignKey
ALTER TABLE `street` DROP FOREIGN KEY `Street_localityId_fkey`;

-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `amount`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `status`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `provider` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `familygroup` DROP COLUMN `familyName`,
    ADD COLUMN `family_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipient` DROP COLUMN `birthDate`,
    DROP COLUMN `email`,
    DROP COLUMN `enrollmentDate`,
    DROP COLUMN `familyGroupId`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `localityId`,
    DROP COLUMN `phone`,
    DROP COLUMN `streetId`,
    DROP COLUMN `streetNumber`,
    ADD COLUMN `birth_date` DATETIME(3) NOT NULL,
    ADD COLUMN `enrollment_date` DATETIME(3) NOT NULL,
    ADD COLUMN `family_group_id` INTEGER NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `riskfactor` ADD COLUMN `recipient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `socialcondition` ADD COLUMN `recipient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `street` DROP COLUMN `localityId`,
    ADD COLUMN `locality_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_benefitrecipient`;

-- DropTable
DROP TABLE `_recipienttoriskfactor`;

-- DropTable
DROP TABLE `_recipienttosocialcondition`;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipient_id` INTEGER NOT NULL,
    `phone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `street_id` INTEGER NOT NULL,
    `street_number` VARCHAR(191) NOT NULL,
    `locality_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `benefit_id` INTEGER NOT NULL,
    `recipient_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `enrollment_date` DATETIME(3) NOT NULL,
    `expiry_date` DATETIME(3) NOT NULL,
    `withdrawal_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Benefit` ADD CONSTRAINT `Benefit_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `BenefitCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_family_group_id_fkey` FOREIGN KEY (`family_group_id`) REFERENCES `FamilyGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_street_id_fkey` FOREIGN KEY (`street_id`) REFERENCES `Street`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_locality_id_fkey` FOREIGN KEY (`locality_id`) REFERENCES `Locality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RiskFactor` ADD CONSTRAINT `RiskFactor_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialCondition` ADD CONSTRAINT `SocialCondition_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Street` ADD CONSTRAINT `Street_locality_id_fkey` FOREIGN KEY (`locality_id`) REFERENCES `Locality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `Benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
