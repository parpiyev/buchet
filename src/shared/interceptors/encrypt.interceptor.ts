import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as msgpack from 'msgpack-lite';
import * as http from 'http';

export const parseBody = (request: http.IncomingMessage) => {
	return new Promise<Buffer>((resolve, reject) => {
		const chunks = [];
		request.on('data', (chunk) => chunks.push(chunk));
		request.on('end', () => resolve(Buffer.concat(chunks)));
		request.on('error', reject);
	});
};

@Injectable()
export class EncryptInterceptor implements NestInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();
		if (
			[
				'/api/auth/callback',
				'/api/mf/document-info',
				'/api/workflow/integration',
				'/api/workflow/ombudsman/request',
				'/api/workflow/agros-request/request',
				'/api/health',
				'/api/workflow/prosecution/organization-list',
				'/api/workflow/prosecution/document-create',
			].includes(context.switchToHttp().getRequest().url) ||
			['/api/auth/one-id'].includes(context.switchToHttp().getRequest().path) ||
			(request?.headers?.referer && request.headers.referer.includes('api-swagger')) ||
			request?.headers['content-type'] === 'application/json'
		) {
			return next.handle();
		}
		request.body = msgpack.decode(await parseBody(request));
		return next.handle().pipe(
			map((data) => {
				request.res.setHeader('Content-Type', 'application/octet-stream');
				request.res.send(msgpack.encode(data));
			}),
		);
	}
}
