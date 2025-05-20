import { Module } from '@nestjs/common';
import { CustomeraddressService } from './customeraddress.service';
import { CustomeraddressController } from './customeraddress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerAddress, CustomerAddressSchema } from './schemas/customeraddress.schemas';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: CustomerAddress.name,
          schema: CustomerAddressSchema,
        },
      ]),
      
    ],
  controllers: [CustomeraddressController],
  providers: [CustomeraddressService],
})
export class CustomeraddressModule {}
