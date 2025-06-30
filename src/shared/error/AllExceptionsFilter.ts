import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import { ErrorLog } from '@shared/error/error-log';
import * as Sentry from '@sentry/minimal';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	constructor(applicationRef: HttpServer) {
		super(applicationRef);
	}

	// @InjectPinoLogger() private readonly logger = new Logger(AllExceptionsFilter.name);
	catch(exception: any, host: ArgumentsHost) {
		if (typeof exception === 'string') {
			exception = JSON.parse(exception);
		}
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const isHttpException = exception instanceof HttpException;
		const exceptionData: any = isHttpException ? exception?.getResponse() : exception;
		// eslint-disable-next-line no-console
		const ClientRequest = ctx.getRequest<Request>();
		const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		![401, 403].includes(status) && console.log('exception', ClientRequest.url, ClientRequest.body, exceptionData);

		const errorLog = new ErrorLog(exceptionData, status, ClientRequest.url, ClientRequest, ClientRequest.user);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { tags, ...error } = errorLog;

		this.sentryError(ClientRequest, exception, errorLog, error).then(() => {
			console.log('Sentry error sent');
		});
		// for (const key in error) {
		// 	error[key] = JSON.parse(error[key]);
		// }

		return response.status(status).json(error);
	}

	async sentryError(ClientRequest, exception, errorLog, error) {
		const sentryError = error;
		// for (const [key, value] of Object.entries(sentryError)) {
		// 	sentryError[key] = JSON.stringify(value);
		// }
		Sentry.setUser(errorLog.user);
		Sentry.setTags(errorLog.tags);
		Sentry.setContext(`${ClientRequest.url}`, sentryError);
		Sentry.captureException(exception);
	}
}
