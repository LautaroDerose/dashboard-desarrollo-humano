/*
  Warnings:

  - You are about to drop the column `family_group_id` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the `familygroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `recipient` DROP FOREIGN KEY `Recipient_family_group_id_fkey`;

-- AlterTable
ALTER TABLE `recipient` DROP COLUMN `family_group_id`;

-- DropTable
DROP TABLE `familygroup`;
