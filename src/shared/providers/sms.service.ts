import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from '../http-service';

@Injectable()
export class SmsService {
	@Inject() private readonly httpService: CustomHttpService;

	fullUrl = `${process.env.NOTIFICATION_SERVICE_URL}/api/sms/send`;
	authToken = `${process.env.NOTIFICATION_SERVICE_TOKEN}`;

	async send(description, phone, canSend = true) {
		if (!canSend) {
			return { success: false };
		}
		return await this.httpService.post(
			this.fullUrl,
			{
				description,
				phone,
			},
			{
				headers: {
					Authorization: `Bearer ${this.authToken}`,
				},
			},
		);
	}
}
