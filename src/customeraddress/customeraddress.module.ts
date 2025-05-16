import { Module } from '@nestjs/common';
import { CustomeraddressService } from './customeraddress.service';
import { CustomeraddressController } from './customeraddress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerCard, CustomerCardSchema } from '../customercard/schemas/customercard.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: CustomerCard.name,
          schema: CustomerCardSchema,
        },
      ]),
      
    ],
  controllers: [CustomeraddressController],
  providers: [CustomeraddressService],
})
export class CustomeraddressModule {}
