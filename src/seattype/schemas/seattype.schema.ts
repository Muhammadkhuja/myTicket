import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SeattypeDocument = HydratedDocument<Seattype>;

@Schema()
export class Seattype {
  @Prop({ required: true })
  name: string;
}

export const SeattypeSchema = SchemaFactory.createForClass(Seattype);
