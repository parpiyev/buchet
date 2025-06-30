import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	public nameUz: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	public nameRu: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	public nameEn: string;
}
