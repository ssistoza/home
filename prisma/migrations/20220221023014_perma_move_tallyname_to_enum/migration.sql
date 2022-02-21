/*
  Warnings:

  - You are about to drop the column `tallyNameId` on the `Tally` table. All the data in the column will be lost.
  - You are about to drop the `TallyName` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Tally` DROP COLUMN `tallyNameId`;

-- DropTable
DROP TABLE `TallyName`;
