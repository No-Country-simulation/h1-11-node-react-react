-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NULL,
    `dni` VARCHAR(191) NOT NULL,
    `sex` ENUM('M', 'F') NOT NULL,
    `bloodFactor` VARCHAR(191) NOT NULL,
    `isValidateEmail` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Patient_email_key`(`email`),
    UNIQUE INDEX `Patient_dni_key`(`dni`),
    INDEX `Patient_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
