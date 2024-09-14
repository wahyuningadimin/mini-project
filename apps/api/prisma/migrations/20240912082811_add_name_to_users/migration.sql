/*
  Warnings:

  - You are about to drop the column `full_name` on the `ms_users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `ms_users` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `ms_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_users` DROP COLUMN `full_name`,
    DROP COLUMN `username`,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
