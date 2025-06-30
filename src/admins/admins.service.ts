import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schemas/admins.schema';
import { hash } from 'bcrypt';
import { IAdmin } from './interface/admins.interface';
import { AdminType } from './shared/admin.enum';
import { AdminNotFoundException, AdminPermissionNotDranted } from '@shared/error/admins/admins-exception';

@Injectable()
export class AdminsService {
	constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

	async create(createAdminDto: CreateAdminDto) {
		createAdminDto.password = await hash(createAdminDto.password, 10);

		const createAdmin = await this.adminModel.create(createAdminDto);
		//@ts-ignore
		delete createAdmin._doc.password;

		return createAdmin;
	}

	findAll() {
		return this.adminModel.find().select('-__v -password');
	}

	async findOne(_id: string) {
		const findAdmin = await this.adminModel.findById(_id).select('-__v -password');

		if (!findAdmin) throw new AdminNotFoundException(_id);

		return findAdmin;
	}

	async update(_id: string, updateAdminDto: UpdateAdminDto, admin: IAdmin) {
		if (admin.status == AdminType.ADMIN && _id != admin._id) throw new AdminPermissionNotDranted();

		const updateAdmin = await this.adminModel
			.findOneAndUpdate({ _id }, updateAdminDto, { new: true })
			.select('-__v -password');

		if (!updateAdmin) throw new AdminNotFoundException(_id);

		return updateAdmin;
	}

	async remove(_id: string) {
		const deleteAdmin = await this.adminModel.findByIdAndRemove(_id).select('-__v -password');

		if (!deleteAdmin) throw new AdminNotFoundException(_id);

		return deleteAdmin;
	}
}
