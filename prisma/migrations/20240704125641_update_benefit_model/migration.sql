/*
  Warnings:

  - You are about to drop the column `frequency` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `benefit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `frequency`,
    DROP COLUMN `provider`,
    DROP COLUMN `type`;
