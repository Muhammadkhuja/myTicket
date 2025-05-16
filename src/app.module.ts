import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { CustomercardModule } from './customercard/customercard.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { CustomeraddressModule } from './customeraddress/customeraddress.module';
import { VenueModule } from './venue/venue.module';
import { VenuephotoModule } from './venuephoto/venuephoto.module';
import { VenueptypesModule } from './venueptypes/venueptypes.module';
import { TypesModule } from './types/types.module';
import { SeatModule } from './seat/seat.module';
import { SeattypeModule } from './seattype/seattype.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    AdminModule,
    AuthModule,
    CustomerModule,
    CustomercardModule,
    DistrictModule,
    RegionModule,
    CustomeraddressModule,
    VenueModule,
    VenuephotoModule,
    VenueptypesModule,
    TypesModule,
    SeatModule,
    SeattypeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
