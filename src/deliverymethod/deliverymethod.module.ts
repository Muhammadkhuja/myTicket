import { Module } from "@nestjs/common";
import { DeliverymethodService } from "./deliverymethod.service";
import { DeliverymethodController } from "./deliverymethod.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Deliverymethod,
  DeliverymethodSchema,
} from "./schemas/deliverymethod.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Deliverymethod.name,
        schema: DeliverymethodSchema,
      },
    ]),
  ],
  controllers: [DeliverymethodController],
  providers: [DeliverymethodService],
})
export class DeliverymethodModule {}
