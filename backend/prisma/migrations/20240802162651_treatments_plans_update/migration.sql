/*
  Warnings:

  - You are about to drop the column `foods` on the `NutritionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `restrictions` on the `NutritionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `exercises` on the `PhysicalActivityPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `NutritionPlan` DROP COLUMN `foods`,
    DROP COLUMN `restrictions`;

-- AlterTable
ALTER TABLE `PhysicalActivityPlan` DROP COLUMN `exercises`;

-- CreateTable
CREATE TABLE `NutritionPlanMeal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nutritionPlanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NutritionPlanRestriction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nutritionPlanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhysicalActivityPlanExercise` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `physicalActivityPlanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NutritionPlanMeal` ADD CONSTRAINT `NutritionPlanMeal_nutritionPlanId_fkey` FOREIGN KEY (`nutritionPlanId`) REFERENCES `NutritionPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionPlanRestriction` ADD CONSTRAINT `NutritionPlanRestriction_nutritionPlanId_fkey` FOREIGN KEY (`nutritionPlanId`) REFERENCES `NutritionPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhysicalActivityPlanExercise` ADD CONSTRAINT `PhysicalActivityPlanExercise_physicalActivityPlanId_fkey` FOREIGN KEY (`physicalActivityPlanId`) REFERENCES `PhysicalActivityPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
