import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShopNotFoundException } from '@shared/error/shops/shops-exception';
import { Model } from 'mongoose';
import { CreateShopDto, UpdateShopDto } from '../dto/shops.dto';
import { Shop, ShopDocument } from '../schemas/shops.schema';
import { ShopStatus } from '../shared/shops.enum';

@Injectable()
export class ShopsService {
	constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}

	create(createShopDto: CreateShopDto) {
		return this.shopModel.create(createShopDto);
	}

	findAll({ searchText, region, status }) {
		if (!status) {
			status = { $ne: ShopStatus.BLOCKED };
		}

		if (!region) {
			region = { $ne: null };
		}

		searchText = searchText ? { $regex: searchText.trim(), $options: 'i' } : { $ne: null };

		return this.shopModel
			.find({
				region,
				$or: [{ name: searchText }, { address: searchText }],
				status,
				isDeleted: { $ne: true },
			})
			.select('-__v');
	}

	async findOne(_id: string) {
		const findShop = await this.shopModel.findOne({ _id, isDeleted: { $ne: true } });

		if (!findShop) throw new ShopNotFoundException(_id);

		return findShop;
	}

	async update(id: string, updateShopDto: UpdateShopDto) {
		const updateShop = await this.shopModel.findByIdAndUpdate(id, updateShopDto, { new: true });

		if (!updateShop) throw new ShopNotFoundException(id);

		return updateShop;
	}

	async remove(id: string) {
		const deleteShop = await this.shopModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

		if (!deleteShop) throw new ShopNotFoundException(id);

		return deleteShop;
	}
}
