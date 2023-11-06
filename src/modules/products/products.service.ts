import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product';
import { ProductFilterQueryDto } from './dto/product-filter-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const product = await this.productModel.create(createProductDto)

        return product
    }



    async findAll(productFilterQueryDto: ProductFilterQueryDto) {
        const { keyword, page, pageSize } = productFilterQueryDto;

        const _pageSize = pageSize || 10;
        const _page = page || 1
        const _keyword = keyword
            ? { name: { $regex: keyword, $options: 'i' } }
            : {}

        const count = await this.productModel.countDocuments({ ..._keyword });

        const products = await this.productModel
            .find({ ..._keyword })
            .limit(_pageSize)
            .skip(_pageSize * (_page - 1));

        const totalPages = Math.ceil(count / _pageSize)

        return { products, page: _page, totalPages }
    }

    async getProductById(id: string) {
        const product = await this.productModel.findById(id);

        if (!product)
            throw new NotFoundException("Product doesn't exist with provided id")

        return product
    }

    async remove(id: string) {
        const product = await this.productModel.findOneAndDelete({ _id: id })


        if (!product)
            throw new NotFoundException("Product doesn't exist with provided id")
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true })

        if (!product)
            throw new NotFoundException("product doesn't exist with provided id")

        return product
    }
}
