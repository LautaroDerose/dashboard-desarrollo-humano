/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    MODIFY `role` ENUM('user', 'admin', 'subsecretaria', 'contaduria', 'tesoreria', 'caja', 'user_ts', 'provedor') NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `verificationtoken`;
