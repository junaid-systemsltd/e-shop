import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as _ from "lodash"


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
