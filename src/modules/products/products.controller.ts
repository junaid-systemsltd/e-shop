// Libs
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// Modules
import { ProductsService } from '@products/products.service';
import { CreateProductDto } from '@products/dto/create-product';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import { UpdateProductDto } from '@products/dto/update-product.dto';
import { ProductFilterQueryDto } from '@products/dto/product-filter-query.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    /**  
        @desc     Create a new Product
        @route    POST /api/products
        @access   Admin
    */
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    /**  
        @desc     Get All paginated Products
        @route    GET /api/products
        @access   Private
    */
    @Get()
    findAll(@Query() productFilterQueryDto: ProductFilterQueryDto) {
        return this.productService.findAll(productFilterQueryDto)
    }

    /**  
        @desc     Get Product by id
        @route    GET /api/products/:id
        @access   Private
    */
    @Get(':id')
    getProductById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.productService.getProductById(id)
    }

    /**  
       @desc     Delete Product by id
       @route    DELETE /api/products/:id
       @access   Admin
   */
    @Delete(':id')
    remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.productService.remove(id)
    }

    /**  
       @desc     Update Product Product
       @route    PATCH /api/products/:id
       @access   Admin
   */
    @Patch(':id')
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto)
    }
}
