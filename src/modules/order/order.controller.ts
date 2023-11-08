import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { JwtGuard } from '../auth/jwt.guard';
import { getUser } from 'src/common/decorators/getUser.decorator';
import { UpdateOrderToPaidDto } from './dto/update-order-topaid.dto';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        const { orderItems } = createOrderDto;

        if (orderItems.length === 0)
            throw new BadRequestException("No order Items added")


        return this.orderService.create(createOrderDto)
    }

    @Get(':id')
    getOrderById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.orderService.getOrderById(id)
    }

    @Get()
    getMyOrders(@getUser('id') userId) {
        return this.orderService.GetMyOrders(userId)
    }

    @Get(':id/pay')
    updateOrderToPaid(
        @Param('id', ParseObjectIdPipe) orderId: string,
        @Body() updateOrderToPaidDto: UpdateOrderToPaidDto
    ) {
        return this.orderService.updateOrderToPaid(orderId, updateOrderToPaidDto)
    }

    @Get('all')
    getAllOrders() {
        return this.orderService.getAllOrders()
    }

}
