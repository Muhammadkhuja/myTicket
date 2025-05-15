import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  save() {
    throw new Error("Method not implemented.");
  }
  @Prop()
  full_name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_token: string;

  @Prop()
  refresh_token: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
