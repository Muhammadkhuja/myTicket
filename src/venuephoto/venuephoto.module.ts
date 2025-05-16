import { Module } from "@nestjs/common";
import { VenuephotoService } from "./venuephoto.service";
import { VenuephotoController } from "./venuephoto.controller";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { Venuephoto, VenuephotoSchema } from "./schemas/venuephoto.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venuephoto.name,
        schema: VenuephotoSchema,
      },
    ]),
  ],
  controllers: [VenuephotoController],
  providers: [VenuephotoService],
})
export class VenuephotoModule {}
