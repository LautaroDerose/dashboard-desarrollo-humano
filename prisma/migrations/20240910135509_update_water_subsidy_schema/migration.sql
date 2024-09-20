/*
  Warnings:

  - You are about to alter the column `credential_number` on the `hospitalcredential` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `value_assignment` on the `watersubsidy` table. All the data in the column will be lost.
  - You are about to alter the column `supply_number` on the `watersubsidy` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `period` on the `watersubsidy` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - Added the required column `is_complete` to the `TravelSubsidy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignment_value` to the `WaterSubsidy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_complete` to the `WaterSubsidy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_number` to the `WaterSubsidy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hospitalcredential` MODIFY `credential_number` INTEGER NULL;

-- AlterTable
ALTER TABLE `travelsubsidy` ADD COLUMN `is_complete` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `watersubsidy` DROP COLUMN `value_assignment`,
    ADD COLUMN `assignment_value` DOUBLE NOT NULL,
    ADD COLUMN `first_expiry` DATE NULL,
    ADD COLUMN `is_complete` BOOLEAN NOT NULL,
    ADD COLUMN `second_expiry` DATE NULL,
    ADD COLUMN `user_number` INTEGER NOT NULL,
    MODIFY `supply_number` INTEGER NOT NULL,
    MODIFY `period` DATE NULL;
