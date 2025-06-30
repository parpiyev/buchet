import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateVendorDto, UpdateVendorDto } from '../dto/vendors.dto';
import { Vendor, VendorDocument } from '../schemas/vendors.schema';
import { VendorStatus } from '../shared/vendors.enum';
import { VendorNotFoundException } from '@shared/error/shops/vendors-exception';

@Injectable()
export class VendorsService {
	constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) {}

	async create(createVendorDto: CreateVendorDto) {
		createVendorDto.password = await hash(createVendorDto.password, 10);

		const createVendor = await this.vendorModel.create(createVendorDto);
		//@ts-ignore
		delete createVendor._doc.password;

		return createVendor;
	}

	findAll({ searchText, dbid, type, status }) {
		if (!status) {
			status = { $ne: VendorStatus.BLOCKED };
		}

		if (!dbid) {
			dbid = { $ne: null };
		}
		if (!type) {
			type = { $ne: null };
		}

		searchText = searchText ? { $regex: searchText.trim(), $options: 'i' } : { $ne: null };

		return this.vendorModel
			.find({
				fullName: searchText,
				dbid,
				type,
				status,
				isDeleted: { $ne: true },
			})
			.select('-__v -password');
	}

	async findOne(_id: string) {
		const findVendor = await this.vendorModel.findOne({
			_id,
			isDeleted: { $ne: true },
		});
		if (!findVendor) throw new VendorNotFoundException(_id);

		return findVendor;
	}

	async update(id: string, updateVendorDto: UpdateVendorDto) {
		const updateVendor = await this.vendorModel
			.findByIdAndUpdate(id, updateVendorDto, { new: true })
			.select('-__v -password');

		if (!updateVendor) throw new VendorNotFoundException(id);

		return updateVendor;
	}

	async remove(id: string) {
		const deleteVendor = await this.vendorModel
			.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
			.select('-__v -password');

		if (!deleteVendor) throw new VendorNotFoundException(id);

		return deleteVendor;
	}
}
