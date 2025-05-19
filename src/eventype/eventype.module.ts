import { Module } from '@nestjs/common';
import { EventypeService } from './eventype.service';
import { EventypeController } from './eventype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Eventype, EventypeSchema } from './schemas/eventype.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Eventype.name,
      schema: EventypeSchema
    }
  ])],
  controllers: [EventypeController],
  providers: [EventypeService],
})
export class EventypeModule {}
