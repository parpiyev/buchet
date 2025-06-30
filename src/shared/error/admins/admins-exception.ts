import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ERROR_PREFIX, ErrorCodes } from '@shared/error/error-codes';

export class AdminNotFoundException extends NotFoundException {
	constructor(id: string) {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.ADMIN_NOT_FOUND}` }, id);
	}
}

export class AdminPermissionNotDranted extends HttpException {
	constructor() {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.YOU_ARE_NOT_ALLOWED}` }, HttpStatus.NOT_ACCEPTABLE);
	}
}
