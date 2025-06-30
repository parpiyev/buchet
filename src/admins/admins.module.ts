import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin, AdminSchema } from './schemas/admins.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
	controllers: [AdminsController],
	providers: [AdminsService],
})
export class AdminsModule {}
