// Libs
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// Modules
import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**  
       @desc     Create a new user
       @route    POST /api/users
       @access   Admin
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**  
       @desc     Get All Users
       @route    GET /api/users
       @access   Admin
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**  
       @desc     Get user by id
       @route    GET /api/users/:id
       @access   Admin
   */
  @Get(':id')
  getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  /**  
       @desc     Update user
       @route    PATCH /api/users/:id
       @access   Admin
   */
  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**  
       @desc     delete user
       @route    DELETE /api/users/:id
       @access   Admin
   */
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
