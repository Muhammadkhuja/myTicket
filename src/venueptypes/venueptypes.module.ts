import { Module } from "@nestjs/common";
import { VenueptypesService } from "./venueptypes.service";
import { VenueptypesController } from "./venueptypes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Venueptype, VenuetypeSchema } from "./schemas/venueptype.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venueptype.name,
        schema: VenuetypeSchema,
      },
    ]),
  ],
  controllers: [VenueptypesController],
  providers: [VenueptypesService],
})
export class VenueptypesModule {}
