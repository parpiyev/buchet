import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserNotFoundException } from '@shared/error/users/users-exception';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { User, UserDocument } from '../schemas/users.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto) {
		createUserDto.password = await hash(createUserDto.password, 10);

		const createVendor = await this.userModel.create(createUserDto);
		//@ts-ignore
		delete createVendor._doc.password;

		return createVendor;
	}

	findAll() {
		return `This action returns all users`;
	}

	async findOne(_id: string) {
		const findUser = await this.userModel.findOne({ _id, isDeleted: { $ne: true } }).select('-__v -password');

		if (!findUser) throw new UserNotFoundException(_id);

		return findUser;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const updateUser = await this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.select('-__v -password');

		if (!updateUser) throw new UserNotFoundException(id);

		return updateUser;
	}

	async remove(id: string) {
		const deleteUser = await this.userModel
			.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
			.select('-__v -password');

		if (!deleteUser) throw new UserNotFoundException(id);

		return deleteUser;
	}
}
