-- CreateTable
CREATE TABLE `ms_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referral_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `category` ENUM('concert', 'musical', 'play', 'classic') NOT NULL,
    `event_type` ENUM('free', 'paid') NOT NULL,
    `event_description` LONGTEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `ticket_start_date` DATETIME(3) NOT NULL,
    `ticket_end_date` DATETIME(3) NOT NULL,
    `created_date` DATETIME(3) NOT NULL,
    `modified_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_events_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `tier_name` ENUM('VIP', 'regular') NOT NULL,
    `max_capacity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tx_events_review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `review` LONGTEXT NOT NULL,
    `created_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tx_users_points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `operations` ENUM('add', 'subtract') NOT NULL,
    `points` INTEGER NOT NULL,
    `created_date` DATETIME(3) NOT NULL,
    `expired_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tx_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `tier_id` INTEGER NOT NULL,
    `promo_code` INTEGER NOT NULL,
    `points_used` INTEGER NOT NULL,
    `original_price` INTEGER NOT NULL,
    `discounted_price` INTEGER NOT NULL,
    `payment_status` ENUM('unpaid', 'pending', 'paid') NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
