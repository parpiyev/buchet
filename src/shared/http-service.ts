import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CustomHttpService {
	constructor(private httpService: HttpService) {}

	post(route, body, config?) {
		return firstValueFrom(
			this.httpService.post(route, body, config).pipe(
				map((response) => {
					return response && response?.data ? response?.data : response;
				}),
			),
		).catch(function (error) {
			const response = error?.response;
			if (response) {
				throw new HttpException(response.data, response.status);
			}
			throw new HttpException(error.toJSON(), error.status || HttpStatus.SERVICE_UNAVAILABLE);
		});
	}

	get(route, config?) {
		return firstValueFrom(
			this.httpService.get(route, config).pipe(
				map((response) => {
					return response?.data;
				}),
			),
		).catch(function (error) {
			const response = error?.response;
			if (response) {
				throw new HttpException(response.data, response.status);
			}
			throw new HttpException(error.toJSON(), error.status || HttpStatus.SERVICE_UNAVAILABLE);
		});
	}

	get axios(): any {
		return this.httpService.axiosRef;
	}
}
