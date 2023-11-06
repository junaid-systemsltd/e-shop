import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from "lodash"
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }


    register(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    async validateToken(token: string) {
        return await this.jwtService.verifyAsync(token);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email }).select('+password')

        // @ts-ignore
        if (user && !(await user?.matchPassword(password))) {
            throw new BadRequestException("invalid credentials")
        }

        const payload = { id: user.id, email: user.email, name: user.name, role: user.role };

        const token = await this.jwtService.signAsync(payload,
            {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1h'
            }
        )

        return { accessToken: token }
    }
}
