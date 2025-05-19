import { Module } from '@nestjs/common';
import { CartitemService } from './cartitem.service';
import { CartitemController } from './cartitem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cartitem, CartitemSchema } from './schemas/cartitem.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Cartitem.name,
      schema: CartitemSchema
    }
  ])],
  controllers: [CartitemController],
  providers: [CartitemService],
})
export class CartitemModule {}
