import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomercardService } from './customercard.service';
import { CreateCustomercardDto } from './dto/create-customercard.dto';
import { UpdateCustomercardDto } from './dto/update-customercard.dto';

@Controller('customercard')
export class CustomercardController {
  constructor(private readonly customercardService: CustomercardService) {}

  @Post()
  create(@Body() createCustomercardDto: CreateCustomercardDto) {
    return this.customercardService.create(createCustomercardDto);
  }

  @Get()
  findAll() {
    return this.customercardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customercardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomercardDto: UpdateCustomercardDto) {
    return this.customercardService.update(id, updateCustomercardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customercardService.remove(id);
  }
}
