import { Injectable } from '@nestjs/common';
import { Mongoose } from 'mongoose';

@Injectable()
export class MongoService {
	instance: Promise<Mongoose>;
	readInstance: Promise<Mongoose>;

	// set("strictQuery", false)

	// constructor() {
	// 	this.instance = connect('mongodb://127.0.0.1/bouquet', {
	// 		strictQuery: true,
	// 		useNewUrlParser: true,
	// 		useUnifiedTopology: true,
	// 		serverSelectionTimeoutMS: 5000,
	// 	} as ConnectOptions);
	// 	this.readInstance = connect('mongodb://127.0.0.1/bouquet', {
	// 		strictQuery: true,
	// 		useNewUrlParser: true,
	// 		useUnifiedTopology: true,
	// 		serverSelectionTimeoutMS: 5000,
	// 	} as ConnectOptions);
	// }

	// set("strictQuery", false);
}
