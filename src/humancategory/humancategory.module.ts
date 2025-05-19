import { Module } from '@nestjs/common';
import { HumancategoryService } from './humancategory.service';
import { HumancategoryController } from './humancategory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Humancategory, HumancategorySchema } from './schemas/humancategory.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Humancategory.name,
      schema: HumancategorySchema
    }
  ])],
  controllers: [HumancategoryController],
  providers: [HumancategoryService],
})
export class HumancategoryModule {}
