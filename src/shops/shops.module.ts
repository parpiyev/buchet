import { Module } from '@nestjs/common';
import { ShopsService } from './services/shops.service';
import { ShopsController } from './controllers/shops.controller';
import { VendorsController } from './controllers/vendors.controller';
import { VendorsService } from './services/vendors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shops.schema';
import { Vendor, VendorSchema } from './schemas/vendors.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Shop.name, schema: ShopSchema },
			{ name: Vendor.name, schema: VendorSchema },
		]),
	],
	controllers: [ShopsController, VendorsController],
	providers: [ShopsService, VendorsService],
})
export class ShopsModule {}
