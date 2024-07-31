/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Laboratory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Laboratory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Laboratory` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Laboratory_name_key` ON `Laboratory`(`name`);
