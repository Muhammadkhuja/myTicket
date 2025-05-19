import { Module } from "@nestjs/common";
import { TicketstatusService } from "./ticketstatus.service";
import { TicketstatusController } from "./ticketstatus.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Ticketstatus,
  TicketstatusSchema,
} from "./schemas/ticketstatus.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticketstatus.name,
        schema: TicketstatusSchema,
      },
    ]),
  ],
  controllers: [TicketstatusController],
  providers: [TicketstatusService],
})
export class TicketstatusModule {}
