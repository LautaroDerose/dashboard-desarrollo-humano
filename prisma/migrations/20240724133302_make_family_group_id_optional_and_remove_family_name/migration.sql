/*
  Warnings:

  - You are about to drop the column `family_name` on the `familygroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Recipient` MODIFY `family_group_id` INT NULL;

ALTER TABLE `FamilyGroup` DROP COLUMN `family_name`;