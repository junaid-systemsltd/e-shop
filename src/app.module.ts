// Libs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Modules
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { OrderModule } from '@order/order.module';
import { ProductsModule } from '@products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI')
      })
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
