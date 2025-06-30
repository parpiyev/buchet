import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AdminType } from '../shared/admin.enum';

export class CreateAdminDto {
	@ApiProperty()
	@IsString()
	@Matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/)
	@MaxLength(25)
	@MinLength(5)
	public username: string;

	@ApiProperty()
	@IsString()
	@MinLength(6)
	public password: string;

	@ApiProperty({ enum: AdminType, required: false })
	@IsString()
	@IsOptional()
	@IsEnum(AdminType)
	public type: string;
}
