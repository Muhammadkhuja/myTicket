import { Module } from '@nestjs/common';
import { CustomercardService } from './customercard.service';
import { CustomercardController } from './customercard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerCard, CustomerCardSchema } from './schemas/customercard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerCard.name,
        schema: CustomerCardSchema
      }
    ])
  ],
  controllers: [CustomercardController],
  providers: [CustomercardService],
})
export class CustomercardModule {}
