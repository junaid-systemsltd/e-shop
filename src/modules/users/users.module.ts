// Libs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Modules
import { UsersService } from '@users/users.service';
import { User, UserSchema } from '@users/user.schema';
import { UsersController } from '@users/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
