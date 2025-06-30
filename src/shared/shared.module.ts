import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { JwtModule } from '@nestjs/jwt';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthClientService } from './providers/auth-client.service';
import { MongoService } from './providers/mongo-service';
import { SmsService } from './providers/sms.service';
import { CustomHttpService } from './http-service';
import { SmsHistoryRepo } from '@shared/providers/sms-history.repo';
import { HumoSendService } from '@shared/providers/humo-send.service';
// import { CustomRedisService } from '@shared/providers/redis-service';

@Module({
	imports: [
		HttpModule,
		JwtModule.register({}),
		EventEmitterModule.forRoot({
			// set this to `true` to use wildcards
			wildcard: false,
			// the delimiter used to segment namespaces
			delimiter: '.',
			// set this to `true` if you want to emit the newListener event
			newListener: true,
			// set this to `true` if you want to emit the removeListener event
			removeListener: false,
			// the maximum amount of listeners that can be assigned to an event
			maxListeners: 100,
			// show event name in memory leak message when more than maximum amount of listeners is assigned
			verboseMemoryLeak: true,
			// disable throwing uncaughtException if an error event is emitted and it has no listeners
			ignoreErrors: false,
		}),
	],
	providers: [
		AuthorizationGuard,
		AuthClientService,
		SmsService,
		SmsHistoryRepo,
		CustomHttpService,
		HumoSendService,
		// CustomRedisService,
		MongoService,
	],
	exports: [
		HttpModule.register({
			timeout: 30000,
			timeoutErrorMessage: 'Time out error',
			maxRedirects: 5,
		}),
		AuthClientService,
		JwtModule,
		SmsService,
		SmsHistoryRepo,
		CustomHttpService,
		HumoSendService,
		// CustomRedisService,
		MongoService,
	],
})
export class SharedModule {}
