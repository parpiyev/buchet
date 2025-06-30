import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AdminType } from '../shared/admin.enum';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
	@Prop({ type: String, unique: true, requred: true })
	username: string;

	@Prop({ type: String, required: true })
	password: number;

	@Prop({ type: String, enum: AdminType, default: AdminType.ADMIN })
	type: AdminType;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
