import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegionNotFoundException } from '@shared/error/regions/regions';
import { Model } from 'mongoose';
import { CreateRegionDto } from './dto/create-region.dto';
import { QueryRegionDto } from './dto/query-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region, RegionDocument } from './schemas/regions.schema';

@Injectable()
export class RegionsService {
	constructor(@InjectModel(Region.name) private regionModel: Model<RegionDocument>) {}

	create(createRegionDto: CreateRegionDto) {
		return this.regionModel.create(createRegionDto);
	}

	findAll({ searchText }: QueryRegionDto) {
		return this.regionModel
			.find({
				$or: [
					{ nameUz: searchText ? { $regex: searchText.trim(), $options: 'i' } : { $ne: null } },
					{ nameRu: searchText ? { $regex: searchText.trim(), $options: 'i' } : { $ne: null } },
					{ nameEn: searchText ? { $regex: searchText.trim(), $options: 'i' } : { $ne: null } },
				],
			})
			.select('-__v -createdAt -updatedAt');
	}

	async findOne(id: string) {
		const findRegion = await this.regionModel.findById(id).select('-__v');

		if (!findRegion) throw new RegionNotFoundException(id);

		return findRegion;
	}

	async update(id: string, updateRegionDto: UpdateRegionDto) {
		const updateRegion = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true }).select('-__v');

		if (!updateRegion) throw new RegionNotFoundException(id);

		return updateRegion;
	}

	async remove(id: string) {
		const deleteRegion = await this.regionModel.findByIdAndRemove(id).select('-__v');

		if (!deleteRegion) throw new RegionNotFoundException(id);

		return deleteRegion;
	}
}
