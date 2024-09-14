/*
  Warnings:
  
  - A unique constraint covering the columns `[referral_code]` on the table `ms_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ms_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_users` 
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),  -- Menambahkan default value
MODIFY `referral_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tx_users_points` 
MODIFY `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `ms_users_referral_code_key` ON `ms_users`(`referral_code`);

-- AddForeignKey
ALTER TABLE `tx_users_points` 
ADD CONSTRAINT `tx_users_points_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `ms_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
