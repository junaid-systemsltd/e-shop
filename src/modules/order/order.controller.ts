// Libs
import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// Modules
import { JwtGuard } from '@auth/jwt.guard';
import { OrderService } from '@order/order.service';
import { getUser } from '@decorators/getUser.decorator';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import { UpdateOrderToPaidDto } from '@order/dto/update-order-topaid.dto';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    /**  
        @desc     Create Order
        @route    POST /api/order
        @access   Private
    */
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        const { orderItems } = createOrderDto;

        if (orderItems.length === 0)
            throw new BadRequestException("No order Items added")


        return this.orderService.create(createOrderDto)
    }

    /**  
        @desc     Get Order by id
        @route    GET /api/order/:id
        @access   Private
    */
    @Get(':id')
    getOrderById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.orderService.getOrderById(id)
    }

    /**  
        @desc     Get my Orders
        @route    GET /api/order
        @access   Private
    */
    @Get()
    getMyOrders(@getUser('id') userId) {
        return this.orderService.GetMyOrders(userId)
    }

    /**  
        @desc     Update Order payment status
        @route    GET /api/order/:id/pay
        @access   Private
    */
    @Get(':id/pay')
    updateOrderToPaid(
        @Param('id', ParseObjectIdPipe) orderId: string,
        @Body() updateOrderToPaidDto: UpdateOrderToPaidDto
    ) {
        return this.orderService.updateOrderToPaid(orderId, updateOrderToPaidDto)
    }

    /**  
        @desc     Get All Orders
        @route    GET /api/order/all
        @access   Admin
    */
    @Get('all')
    getAllOrders() {
        return this.orderService.getAllOrders()
    }

}
