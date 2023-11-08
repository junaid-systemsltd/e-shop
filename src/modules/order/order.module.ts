// Libs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Modules
import { OrderService } from '@order/order.service';
import { Order, OrderSchema } from '@order/order.schema';
import { OrderController } from '@order/order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema
    }])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
