import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(

        private authService: AuthService
    ) { }
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        // Registering new User
        await this.authService.register(createUserDto);

        // Logged-in with new user
        const { email, password } = createUserDto;
        const loginDto = { email, password };
        return await this.authService.login(loginDto)
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req) {
        return req.user;
    }
}
