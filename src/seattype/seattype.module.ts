import { Module } from "@nestjs/common";
import { SeattypeService } from "./seattype.service";
import { SeattypeController } from "./seattype.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Seattype, SeattypeSchema } from "./schemas/seattype.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seattype.name,
        schema: SeattypeSchema,
      },
    ]),
  ],
  controllers: [SeattypeController],
  providers: [SeattypeService],
})
export class SeattypeModule {}
