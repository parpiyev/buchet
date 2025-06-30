import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/bouquet', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
		}),
		SharedModule,
		AdminsModule,
		UsersModule,
		RegionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
