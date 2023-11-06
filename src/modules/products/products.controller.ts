import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product';
import { ProductsService } from './products.service';
import { IsMongoId } from 'class-validator';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { ProductFilterQueryDto } from './dto/product-filter-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService
    ) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll(@Query() productFilterQueryDto: ProductFilterQueryDto) {
        return this.productService.findAll(productFilterQueryDto)
    }

    @Get(':id')
    getProductById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.productService.getProductById(id)
    }

    @Delete(':id')
    remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.productService.remove(id)
    }

    @Patch(':id')
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto)
    }
}
