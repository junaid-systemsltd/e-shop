// Libs
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// Modules
import { JwtGuard } from '@auth/jwt.guard';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { getUser } from '@/common/decorators/getUser.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**  
        @desc     Register new User
        @route    POST /api/auth/register
        @access   Pubic
    */
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        // Registering new User
        await this.authService.register(createUserDto);

        // Logged-in with new user
        const { email, password } = createUserDto;
        const loginDto = { email, password };
        return await this.authService.login(loginDto)
    }

    /**  
        @desc     Auth user & get token
        @route    POST /api/auth/login
        @access   Pubic
    */
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    /**  
        @desc     Get user profile
        @route    GET /api/auth/profile
        @access   Private
    */
    @Get('profile')
    @UseGuards(JwtGuard)
    getProfile(@getUser() user) {
        return user;
    }
}
