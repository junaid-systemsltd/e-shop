// Libs
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
// Modules
import { AuthService } from '@auth/auth.service';
import { JwtStrategy } from '@auth/jwt.strategy';
import { UsersModule } from '@users/users.module';
import { User, UserSchema } from '@users/user.schema';
import { AuthController } from '@auth/auth.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
