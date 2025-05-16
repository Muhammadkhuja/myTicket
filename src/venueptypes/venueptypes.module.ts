import { Module } from '@nestjs/common';
import { VenueptypesService } from './venueptypes.service';
import { VenueptypesController } from './venueptypes.controller';

@Module({
  controllers: [VenueptypesController],
  providers: [VenueptypesService],
})
export class VenueptypesModule {}
