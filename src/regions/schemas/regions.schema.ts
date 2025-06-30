import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegionDocument = HydratedDocument<Region>;

@Schema({ timestamps: true })
export class Region {
	@Prop({ type: String })
	nameUz: string;

	@Prop({ type: String })
	nameRu: string;

	@Prop({ type: String })
	nameEn: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
