import { Module } from "@nestjs/common";
import { PaymentmethodService } from "./paymentmethod.service";
import { PaymentmethodController } from "./paymentmethod.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Paymentmethod,
  PaymentmethodSchema,
} from "./schemas/paymentmethod.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Paymentmethod.name,
        schema: PaymentmethodSchema,
      },
    ]),
  ],
  controllers: [PaymentmethodController],
  providers: [PaymentmethodService],
})
export class PaymentmethodModule {}
