import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { VendorStatus, VendorType } from '../shared/vendors.enum';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema({ timestamps: true })
export class Vendor {
	@Prop({ type: String, required: true })
	fullName: string;

	@Prop({ type: Number, required: true })
	phone: number;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: Types.ObjectId, required: true })
	dbId: string;

	@Prop({
		type: String,
		enum: VendorType,
		required: true,
	})
	type: VendorType;

	@Prop({
		type: String,
		enum: VendorStatus,
		default: VendorStatus.CREATED_BY_ADMIN,
	})
	status: VendorStatus;

	@Prop({ type: Boolean, default: false })
	isDeleted: boolean;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
