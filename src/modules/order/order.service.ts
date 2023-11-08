import { Body, Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { UpdateOrderToPaidDto } from './dto/update-order-topaid.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        const order = await this.orderModel.create(createOrderDto)

        return order
    }

    async getOrderById(id: string) {
        const order = await this.orderModel.findById(id);

        if (!order)
            throw new NotFoundException("order doesn't exist with provided id")

        return order
    }

    async GetMyOrders(userId: string) {
        const orders = await this.orderModel.find({ user: userId })

        return orders;
    }

    async updateOrderToPaid(orderId: string, updateOrderToPaidDto: UpdateOrderToPaidDto) {
        const order = await this.orderModel.findById(orderId);

        if (!order)
            throw new NotFoundException("order doesn't exist with provided id")

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = { ...updateOrderToPaidDto, updateTime: new Date() }

        const updatedOrder = await order.save()

        return updatedOrder
    }

    async getAllOrders() {
        return await this.orderModel.find();
    }
}
