import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrentUser } from '@shared/decorators/user.decorator';
import { IAdmin } from './interface/admins.interface';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Post()
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminsService.create(createAdminDto);
	}

	@Get()
	findAll() {
		return this.adminsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.adminsService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @CurrentUser() admin: IAdmin) {
		return this.adminsService.update(id, updateAdminDto, admin);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.adminsService.remove(id);
	}
}
