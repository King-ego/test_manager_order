-- AddForeignKey
ALTER TABLE `product_orders` ADD CONSTRAINT `product_orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
