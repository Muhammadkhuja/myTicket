import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomeraddressService } from './customeraddress.service';
import { CreateCustomeraddressDto } from './dto/create-customeraddress.dto';
import { UpdateCustomeraddressDto } from './dto/update-customeraddress.dto';

@Controller('customeraddress')
export class CustomeraddressController {
  constructor(private readonly customeraddressService: CustomeraddressService) {}

  @Post()
  create(@Body() createCustomeraddressDto: CreateCustomeraddressDto) {
    return this.customeraddressService.create(createCustomeraddressDto);
  }

  @Get()
  findAll() {
    return this.customeraddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customeraddressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomeraddressDto: UpdateCustomeraddressDto) {
    return this.customeraddressService.update(id, updateCustomeraddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customeraddressService.remove(id);
  }
}
