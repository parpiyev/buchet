import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '../shared/users.enum';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;

	@ApiProperty()
	@IsNumber()
	phone: number;

	@ApiProperty()
	@IsString()
	password: string;
}

export class UpdateUserDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	firstName: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	lastName: string;

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
	@IsString({ each: true })
	linkedCards: string[];

	@ApiProperty({ enum: UserStatus, required: false })
	@IsOptional()
	@IsString()
	@IsEnum(UserStatus)
	status: UserStatus;
}
