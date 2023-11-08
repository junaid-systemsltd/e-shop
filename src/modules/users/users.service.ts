// Libs
import * as _ from "lodash"
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// Modules
import { User } from '@users/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const isUserExist = await this.userModel.findOne({ email })

    if (isUserExist)
      throw new BadRequestException("account with this email is already exist!")


    const user = await this.userModel.create(createUserDto);

    return user
  }

  async findAll() {
    return await this.userModel.find();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id)

    if (!user)
      throw new NotFoundException("User doesn't exist with provided id")

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true });

    if (!user)
      throw new NotFoundException("User doesn't exist with provided id")

    return user

  }

  async remove(id: string) {
    const user = await this.userModel.findOneAndDelete({ _id: id })

    if (!user)
      throw new NotFoundException("User doesn't exist with provided id")
  }
}
