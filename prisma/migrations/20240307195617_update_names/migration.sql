/*
  Warnings:

  - You are about to drop the column `plantId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the `plant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planttoorder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_plantId_fkey`;

-- DropForeignKey
ALTER TABLE `planttoorder` DROP FOREIGN KEY `PlantToOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `planttoorder` DROP FOREIGN KEY `PlantToOrder_plantId_fkey`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `plantId`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `plant`;

-- DropTable
DROP TABLE `planttoorder`;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductToOrder` (
    `productId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,

    PRIMARY KEY (`productId`, `orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductToOrder` ADD CONSTRAINT `ProductToOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductToOrder` ADD CONSTRAINT `ProductToOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
