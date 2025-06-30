import { NotFoundException } from '@nestjs/common';
import { ERROR_PREFIX, ErrorCodes } from '@shared/error/error-codes';

export class ShopNotFoundException extends NotFoundException {
	constructor(id: string) {
		super({ code: `${ERROR_PREFIX}${ErrorCodes.SHOP_NOT_FOUND}` }, id);
	}
}
