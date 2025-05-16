import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CustomerCardDocument = HydratedDocument<CustomerCard>;

@Schema()
export class CustomerCard {
  save() {
    throw new Error("Method not implemented.");
  }
  @Prop({type: Types.ObjectId,ref: "Customer"})
  cutomer_id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  number: number;

  @Prop()
  year: number;

  @Prop()
  month: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_main: boolean;
}

export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard);