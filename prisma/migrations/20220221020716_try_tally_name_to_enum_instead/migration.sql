/*
  Warnings:

  - Added the required column `category` to the `Tally` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tally` ADD COLUMN `category` ENUM('Shower', 'DogBone') NOT NULL;
