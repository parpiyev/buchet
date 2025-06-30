import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ShopStatus } from '../shared/shops.enum';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: true })
export class Shop {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: Types.ObjectId, ref: 'Regions', required: true })
	region: string;

	@Prop({ type: String, required: true })
	address: string;

	@Prop({ type: [Number], required: true })
	schedule: number[];

	@Prop({ type: Number, required: true })
	margin: number;

	@Prop({ type: Number, maxlength: 16, minlength: 16, required: true })
	shopCard: number;

	@Prop({
		type: String,
		enum: ShopStatus,
		default: ShopStatus.ACTIVE,
	})
	status: ShopStatus;

	@Prop({ type: Boolean, default: false })
	isDeleted: boolean;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
