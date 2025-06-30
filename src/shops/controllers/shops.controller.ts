import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShopsService } from '../services/shops.service';
import { CreateShopDto, UpdateShopDto } from '../dto/shops.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('shops')
@ApiTags('shops')
export class ShopsController {
	constructor(private readonly shopsService: ShopsService) {}

	@ApiBody({
		description: 'shops create',
		type: CreateShopDto,
	})
	@Post()
	create(@Body() createShopDto: CreateShopDto) {
		return this.shopsService.create(createShopDto);
	}

	@ApiBody({
		description: 'shops list',
	})
	@Get()
	findAll(@Query() query) {
		return this.shopsService.findAll(query);
	}

	@ApiBody({
		description: 'shops get-by-id',
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.shopsService.findOne(id);
	}

	@ApiBody({
		description: 'shops update-by-id',
		type: UpdateShopDto,
	})
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
		return this.shopsService.update(id, updateShopDto);
	}

	@ApiBody({
		description: 'shops delete-by-id',
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.shopsService.remove(id);
	}
}
