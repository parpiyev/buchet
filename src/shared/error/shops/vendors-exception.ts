import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ERROR_PREFIX, ErrorCodes } from '@shared/error/error-codes';

export class VendorNotFoundException extends NotFoundException {
	constructor(id: string) {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.VENDOR_NOT_FOUND}` }, id);
	}
}

export class VendorPermissionNotDranted extends HttpException {
	constructor() {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.YOU_ARE_NOT_ALLOWED}` }, HttpStatus.NOT_ACCEPTABLE);
	}
}
