import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionDto {
	@ApiProperty()
	@IsString()
	public nameUz: string;

	@ApiProperty()
	@IsString()
	public nameRu: string;

	@ApiProperty()
	@IsString()
	public nameEn: string;
}
