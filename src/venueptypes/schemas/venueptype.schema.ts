import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

@Schema()
export class Venueptype {
  @Prop({ type: Types.ObjectId, ref: "Venue" })
  venue_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "type" })
  type_id: Types.ObjectId;
}

export type VenueptypeDocument = HydratedDocument<Venueptype>;
export const VenuetypeSchema = SchemaFactory.createForClass(Venueptype);
