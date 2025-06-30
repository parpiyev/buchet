import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserStatus } from '../shared/users.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop({ type: String, required: true })
	firstName: string;

	@Prop({ type: String, required: true })
	lastName: string;

	@Prop({ type: Number, required: true })
	phone: number;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: [String], required: true })
	linkedCards: string;

	@Prop({
		type: String,
		enum: UserStatus,
		default: UserStatus.ACTIVE,
	})
	status: UserStatus;

	@Prop({ type: Boolean, default: false })
	isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
