import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from '../http-service';

@Injectable()
export class HumoSendService {
	@Inject() private readonly httpClient: CustomHttpService;

	async send(message, humo_user_id, canSend = true) {
		if (!canSend) {
			return { success: false };
		}
		return await this.httpClient.post(
			`${process.env.NOTIFICATION_SERVICE_URL}/api/humo/send`,
			{
				message,
				humo_user_id,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.NOTIFICATION_SERVICE_TOKEN}`,
				},
			},
		);
	}
}
