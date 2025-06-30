import { BaseRepo } from '@shared/providers/base-dao';

export class SmsHistoryRepo extends BaseRepo<any> {
	constructor() {
		super('sms_history');
	}

	// isPhoneExist({ knex = this.knexRead, phone }) {
	// 	return knex.select(1).from('users').where('phone', phone).andWhere('verified_phone', true).first();
	// }

	// insert(params) {
	// 	return super.insert({ ...params, id: this.generateRecordId() });
	// }

	// insertWithTransaction(trx, value, returning = ['*']) {
	// 	return super.insertWithTransaction(trx, { ...value, id: this.generateRecordId() }, returning);
	// }

	// validatePhoneNumber({ knex = this.knexRead, user_id, code, type }) {
	// 	return knex
	// 		.select('sh.id', 'sh.phone')
	// 		.from('sms_history as sh')
	// 		.where('sh.user_id', user_id)
	// 		.andWhere('sh.code', code)
	// 		.andWhere('sh.type', type)
	// 		.whereNot('sh.is_deleted', true)
	// 		.orderBy('sh.created_at', 'desc')
	// 		.first();
	// }

	// removeUserUnusedCodes({ knex = this.knex, user_id, type }) {
	// 	return knex('sms_history').update({ is_deleted: true }).where('user_id', user_id).where('type', type);
	// }
}
