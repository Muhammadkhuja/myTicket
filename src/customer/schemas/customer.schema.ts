import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  save() {
    throw new Error("Method not implemented.");
  }
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gander: boolean;

  @Prop()
  lang_id: number;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_token: string;

  @Prop()
  refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
