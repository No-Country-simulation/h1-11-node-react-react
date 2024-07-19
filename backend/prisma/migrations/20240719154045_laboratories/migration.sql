-- CreateTable
CREATE TABLE `Laboratory` (
    `id` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,
    `type` ENUM('MEDICINA', 'ANALISIS') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
