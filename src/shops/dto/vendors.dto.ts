import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { VendorStatus, VendorType } from '../shared/vendors.enum';

export class CreateVendorDto {
	@ApiProperty()
	@IsString()
	fullName: string;

	@ApiProperty()
	@IsNumber()
	phone: number;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsMongoId()
	dbId: Types.ObjectId;

	@ApiProperty({ enum: VendorType })
	@IsString()
	@IsEnum(VendorType)
	type: VendorType;

	@ApiProperty({ enum: VendorStatus, required: false })
	@IsString()
	@IsOptional()
	@IsEnum(VendorStatus)
	status: VendorStatus;
}

export class UpdateVendorDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	fullName: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	phone: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	password: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	newPassword: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	dbId: Types.ObjectId;

	@ApiProperty({ enum: VendorType, required: false })
	@IsOptional()
	@IsString()
	@IsEnum(VendorType)
	type: VendorType;

	@ApiProperty({ enum: VendorStatus, required: false })
	@IsString()
	@IsOptional()
	@IsEnum(VendorStatus)
	status: VendorStatus;
}
