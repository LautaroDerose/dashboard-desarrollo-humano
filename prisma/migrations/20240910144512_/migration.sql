/*
  Warnings:

  - Made the column `period` on table `watersubsidy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_expiry` on table `watersubsidy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `second_expiry` on table `watersubsidy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `watersubsidy` MODIFY `period` DATE NOT NULL,
    MODIFY `assignment_value` DOUBLE NULL,
    MODIFY `first_expiry` DATE NOT NULL,
    MODIFY `is_complete` BOOLEAN NULL,
    MODIFY `second_expiry` DATE NOT NULL;
