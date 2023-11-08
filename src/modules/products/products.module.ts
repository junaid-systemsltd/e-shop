// Libs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Modules
import { ProductsService } from '@products/products.service';
import { ProductsController } from '@products/products.controller';
import { Product, ProductSchema } from '@products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Product.name, schema: ProductSchema
    }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
