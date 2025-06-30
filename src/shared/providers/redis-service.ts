// import { Injectable } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class CustomRedisService {
// 	_client: any;
// 	_black_list_client: any;
// 	DOCUMENT_VIEW_DB = 2; // for document view
// 	BLACK_LIST_USER = 3;

// 	constructor() {
// 		const documentViewUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${this.DOCUMENT_VIEW_DB}`;
// 		const blackListUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${this.BLACK_LIST_USER}`;

// 		this._client = new Redis(documentViewUrl);
// 		this._black_list_client = new Redis(blackListUrl);
// 	}

// 	get client() {
// 		return this._client;
// 	}
// 	get blackListClient() {
// 		return this._black_list_client;
// 	}

// 	disconnect() {
// 		this._client.disconnect(true);
// 		this._black_list_client.disconnect(true);
// 	}

// 	set(key, value, ttl = 86400, mode?) {
// 		if (ttl) {
// 			return this.client.set(key, value, mode || 'ex', ttl);
// 		}
// 		return this.client.set(key, value);
// 	}
// 	blackListSet(key, value, ttl = 86400, mode?) {
// 		if (ttl) {
// 			return this._black_list_client.set(key, value, mode || 'ex', ttl);
// 		}
// 		return this._black_list_client.set(key, value);
// 	}

// 	del(key) {
// 		return this.client.del(key);
// 	}
// 	blackListDel(key) {
// 		return this._black_list_client.del(key);
// 	}

// 	get(value) {
// 		try {
// 			return this.client.get(value);
// 		} catch (err) {
// 			console.log(err);
// 			return null;
// 		}
// 	}
// 	blackListGet(value) {
// 		try {
// 			return this._black_list_client.get(value);
// 		} catch (err) {
// 			return null;
// 		}
// 	}
// }
