import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryRegionDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	public searchText: string;
}
