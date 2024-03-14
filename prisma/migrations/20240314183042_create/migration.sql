/*
  Warnings:

  - You are about to drop the column `comment` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `producttoorder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `producttoorder` DROP FOREIGN KEY `ProductToOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `producttoorder` DROP FOREIGN KEY `ProductToOrder_productId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `comment`;

-- DropTable
DROP TABLE `producttoorder`;

-- CreateTable
CREATE TABLE `CartProduct` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
