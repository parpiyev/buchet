import { HttpException } from '@nestjs/common/exceptions';
import { ERROR_PREFIX } from './error-codes';

export class ErrorLog extends HttpException {
	statusCode: number;
	timestamp: string;
	api: string;
	label: string;
	tags: any;
	request: { body: any; query: any; params: any };
	user: any;

	constructor(exceptionData: any | Record<string, any>, status: number, requestUrl: string, request, user) {
		const exception = checkCode(exceptionData);
		super(exception, status);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { details, modules, roles, ...user_data } = user || {};
		this.statusCode = status;
		this.timestamp = new Date().toISOString();
		this.api = requestUrl;
		this.label = 'EDO';
		this.tags = {
			db_id: user?.db_id,
			type: this.errorGroup(this.statusCode),
			api: this.api,
			user_agent: request.headers['user-agent'],
			client: request.headers['sec-ch-ua-platform'],
			client_browser: request.headers['sec-ch-ua'],
			referer: request.headers['referer'],
			ip_address: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
		};
		this.request = {
			body: JSON.stringify(request.body),
			params: JSON.stringify(request.params),
			query: JSON.stringify(request.query),
		};
		this.user = user_data;
	}

	errorGroup(status) {
		if (status >= 300 && status < 400) {
			return 'REDIRECTION';
		}
		if (status >= 400 && status < 500) {
			return 'CLIENT_ERROR';
		}
		if (status >= 500 && status < 600) {
			return 'SERVER_ERROR';
		}
	}
}

function checkCode(exceptionData) {
	const exception = exceptionData && exceptionData.response ? exceptionData.response : exceptionData;
	if (typeof exception === 'string') {
		return { message: exception, code: `${ERROR_PREFIX}000` };
	}
	if (!(exception && typeof exception === 'object' && exception.hasOwnProperty('code'))) {
		exception.code = `${ERROR_PREFIX}000`;
	}
	return exception;
}
