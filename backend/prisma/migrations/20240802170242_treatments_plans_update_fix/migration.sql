/*
  Warnings:

  - You are about to alter the column `calories` on the `NutritionPlan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `NutritionPlan` MODIFY `calories` INTEGER NOT NULL;
