import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VendorsService } from '../services/vendors.service';
import { CreateVendorDto, UpdateVendorDto } from '../dto/vendors.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('vendors')
@ApiTags('vendors')
export class VendorsController {
	constructor(private readonly vendorsService: VendorsService) {}

	@ApiBody({
		description: 'vendors create',
		type: CreateVendorDto,
	})
	@Post()
	create(@Body() createVendorDto: CreateVendorDto) {
		return this.vendorsService.create(createVendorDto);
	}

	@ApiBody({
		description: 'vendors list',
	})
	@Get()
	findAll(@Query() query) {
		return this.vendorsService.findAll(query);
	}

	@ApiBody({
		description: 'vendors get-by-id',
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.vendorsService.findOne(id);
	}

	@ApiBody({
		description: 'vendors update-by-id',
		type: UpdateVendorDto,
	})
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
		return this.vendorsService.update(id, updateVendorDto);
	}

	@ApiBody({
		description: 'vendors delete-by-id',
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.vendorsService.remove(id);
	}
}
