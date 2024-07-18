/*
  Warnings:

  - A unique constraint covering the columns `[recipient_id]` on the table `ContactInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ContactInfo_recipient_id_key` ON `ContactInfo`(`recipient_id`);
