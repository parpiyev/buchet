import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { QueryRegionDto } from './dto/query-region.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('regions')
@ApiTags('regions')
export class RegionsController {
	constructor(private readonly regionsService: RegionsService) {}

	@ApiBody({
		description: 'rerions create',
		type: CreateRegionDto,
	})
	@Post()
	create(@Body() createRegionDto: CreateRegionDto) {
		return this.regionsService.create(createRegionDto);
	}

	@ApiBody({
		description: 'rerions list',
		type: QueryRegionDto,
	})
	@Get()
	findAll(@Query() query: QueryRegionDto) {
		return this.regionsService.findAll(query);
	}

	@ApiBody({
		description: 'rerions get-by-id',
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.regionsService.findOne(id);
	}

	@ApiBody({
		description: 'rerions uptage-by-id',
		type: UpdateRegionDto,
	})
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
		return this.regionsService.update(id, updateRegionDto);
	}

	@ApiBody({
		description: 'rerions delete-by-id',
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.regionsService.remove(id);
	}
}
