// Libs
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
// Modules
import { Order } from '@order/order.schema';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { UpdateOrderToPaidDto } from '@order/dto/update-order-topaid.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async create(createOrderDto: CreateOrderDto) {
        return await this.orderModel.create(createOrderDto)
    }

    async getOrderById(id: string) {
        const order = await this.orderModel.findById(id);

        if (!order)
            throw new NotFoundException("order doesn't exist with provided id")

        return order
    }

    async GetMyOrders(userId: string) {
        return await this.orderModel.find({ user: userId })
    }

    async updateOrderToPaid(orderId: string, updateOrderToPaidDto: UpdateOrderToPaidDto) {
        const order = await this.orderModel.findById(orderId);

        if (!order)
            throw new NotFoundException("order doesn't exist with provided id")

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = { ...updateOrderToPaidDto, updateTime: new Date() }

        return await order.save()
    }

    async getAllOrders() {
        return await this.orderModel.find();
    }
}
