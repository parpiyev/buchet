import { Inject } from '@nestjs/common';
import { MongoService } from '@shared/providers/mongo-service';
// import { Model } from 'mongoose';
// import { isEmpty } from 'lodash';

// export interface IBaseQuery<T> {
// 	T;
// }

export class BaseRepo<T> {
	@Inject() mongoService: MongoService;

	get mongo() {
		return this.mongoService.instance;
	}
	get mongoRead() {
		return this.mongoService.readInstance;
	}

	get tableName(): string {
		return this._tableName;
	}

	constructor(private _tableName: string) {}

	async getUserByIdJson(id: string): Promise<T> {
		return await (await this.mongoRead).model(this._tableName).findById(id);
	}

	jsonBSetWithCoalesce(coalesce: string | null, otherInput: string, trx?) {
		const mongo = trx ? trx : this.mongoService.readInstance;
		return mongo.raw(`jsonb_set(${coalesce && `coalesce(${coalesce})`}, ${otherInput})`);
	}
}
