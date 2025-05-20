import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  save() {
    throw new Error("Method not implemented.");
  }

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Customer" })
  cutomer_id: Types.ObjectId;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
