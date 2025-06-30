import { NotFoundException } from '@nestjs/common';
import { ERROR_PREFIX, ErrorCodes } from '@shared/error/error-codes';

export class UserNotFoundException extends NotFoundException {
	constructor(id: string) {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.USER_NOT_FOUND}` }, id);
	}
}
