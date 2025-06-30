import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ShopStatus } from '../shared/shops.enum';

export class CreateShopDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsMongoId()
	region: Types.ObjectId;

	@ApiProperty()
	@IsString()
	address: string;

	@ApiProperty()
	@IsNumber(null, { each: true })
	schedule: number[];

	@ApiProperty()
	@IsNumber()
	margin: number;

	@ApiProperty()
	@IsNumber()
	shopCard: number;

	@ApiProperty({ enum: ShopStatus, required: false })
	@IsString()
	@IsOptional()
	@IsEnum(ShopStatus)
	status: ShopStatus;
}

export class UpdateShopDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	region: Types.ObjectId;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	address: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber(null, { each: true })
	schedule: number[];

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	margin: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	shopCard: number;

	@ApiProperty({ enum: ShopStatus, required: false })
	@IsString()
	@IsOptional()
	@IsEnum(ShopStatus)
	status: ShopStatus;
}
