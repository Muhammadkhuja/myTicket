import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliverymethodService } from './deliverymethod.service';
import { CreateDeliverymethodDto } from './dto/create-deliverymethod.dto';
import { UpdateDeliverymethodDto } from './dto/update-deliverymethod.dto';

@Controller('deliverymethod')
export class DeliverymethodController {
  constructor(private readonly deliverymethodService: DeliverymethodService) {}

  @Post()
  create(@Body() createDeliverymethodDto: CreateDeliverymethodDto) {
    return this.deliverymethodService.create(createDeliverymethodDto);
  }

  @Get()
  findAll() {
    return this.deliverymethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverymethodService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliverymethodDto: UpdateDeliverymethodDto) {
    return this.deliverymethodService.update(id, updateDeliverymethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverymethodService.remove(id);
  }
}
