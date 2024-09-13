/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ms_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ms_users` MODIFY `full_name` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ms_users_email_key` ON `ms_users`(`email`);
