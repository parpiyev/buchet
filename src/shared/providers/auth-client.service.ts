import {
	ForbiddenException,
	Inject,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { CustomHttpService } from '../http-service';
import { MongoService } from './mongo-service';
import { JwtService } from '@nestjs/jwt';
// import { CustomRedisService } from '@shared/providers/redis-service';
import { isEmpty } from 'lodash';
import { ERROR_PREFIX, ErrorCodes } from '@shared/error/error-codes';

@Injectable()
export class AuthClientService {
	client: any;
	@Inject() private readonly mongoService: MongoService;

	@Inject() jwtService: JwtService;
	// @Inject() redisService: CustomRedisService;

	constructor(private httpService: CustomHttpService) {}

	post(route, body) {
		return this.httpService.post(`${process.env.IJRO_AUTH_URL}${route}`, body);
	}

	get(route, config?): Promise<any> {
		return this.httpService.get(`${process.env.IJRO_AUTH_URL}${route}`, config);
	}
	//
	async getToken({ code, client_id, session_id, ip_address = null }) {
		try {
			const body = {
				client_secret: String(process.env.IJRO_CLIENT_SECRET),
				client_id: process.env.IJRO_CLIENT_ID || client_id,
				session_id,
				ip_address,
				code: code,
			};

			const response = await this.post('/oauth/token', body);
			if (response) {
				const token = response;
				token.user = await this.getUser(token.access_token);
				return token;
			}

			return response;
		} catch (error: any) {
			this.catchError(error);
		}
	}

	async getRefreshToken({ client_id, session_id, refresh_token }) {
		try {
			const response = await this.post('/oauth/token-refresh', {
				client_secret: process.env.IJRO_CLIENT_SECRET,
				client_id,
				session_id,
				refresh_token,
			});

			if (response) {
				const token = response;
				token.user = await this.getUser(token.access_token);
				return token;
			}

			throw new UnauthorizedException(response);
		} catch (error: any) {
			if (error.response) {
				const response = error.response;
				if ((error.status || response.status || response.statusCode) === 401) {
					throw new UnauthorizedException(response.data);
				}
				throw new ForbiddenException(response.data);
			}
			throw new ForbiddenException(error);
		}
	}

	async getSession({ public_key, curve }) {
		try {
			const response = await this.post('/sessions/create', {
				curve,
				public_key,
				encryption: true,
			});
			if (response) {
				return response;
			}
			throw new UnauthorizedException(response);
		} catch (error: any) {
			if ((error.status || error.statusCode) === 401) {
				throw new UnauthorizedException(error);
			}
			if (error.status === 403) {
				throw new ForbiddenException(error);
			}
			throw new ForbiddenException(error);
		}
	}

	async getUser(access_token) {
		try {
			const verify = await this.jwtService.verifyAsync(access_token, {
				secret: `${String(process.env.IJRO_CLIENT_SECRET)}`,
			});

			if (isEmpty(verify) || !verify.exp) {
				throw new ForbiddenException();
			}

			// const blackList = await this.redisService.blackListGet(verify.id);
			// this.redisService.disconnect();
			// if (!isEmpty(blackList)) {
			// 	throw new ForbiddenException({ code: `${ERROR_PREFIX}${ErrorCodes.USER_IN_BLACK_LIST}` });
			// }
			if (new Date().getTime() >= Number(verify.exp) * 1000) {
				throw new UnauthorizedException({ code: `${ERROR_PREFIX}${ErrorCodes.USER_TOKEN_EXPIRED}` });
			}
			return verify;
		} catch (error) {
			this.catchError(error);
		}
	}

	private catchError(error) {
		if (error.response) {
			const response = error.response;
			if ((error.status || response.status || response.statusCode) === 401) {
				throw new UnauthorizedException(response);
			}
			if (response.status === 403) {
				throw new ForbiddenException(response);
			}
			throw new ForbiddenException(error);
		}
		throw new ForbiddenException(error);
	}

	async verifyPkcs7({ pkcs7, session_id, client_id }) {
		try {
			const response = await this.post('/oauth/verify-pkcs7', {
				pkcs7,
				session_id,
				client_id,
				client_secret: String(process.env.IJRO_CLIENT_SECRET),
			});
			if (response) {
				const token = response;
				token.user = await this.getUser(token.access_token);
				return token;
			}

			return null;
		} catch (error: any) {
			if (error.response) {
				const response = error.response;
				if ((error.status || response.status || response.statusCode) === 401) {
					throw new UnauthorizedException(response.data);
				}
				if (response.status === 403) {
					throw new ForbiddenException(response.data);
				}
			}
			throw new ForbiddenException(error);
		}
	}

	async terminateRemoteSession(params) {
		try {
			const body = {
				client_secret: String(process.env.IJRO_CLIENT_SECRET),
				client_id: params.client_id,
				access_token: params.access_token,
			};
			await this.post('/oauth/terminate-remote-session', body);
			return { success: true };
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	getUserByPinpp(pinpp) {
		return this.mongoService.readInstance;
		pinpp;
	}
}
