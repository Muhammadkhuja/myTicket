import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueptypesService } from './venueptypes.service';
import { CreateVenueptypeDto } from './dto/create-venueptype.dto';
import { UpdateVenueptypeDto } from './dto/update-venueptype.dto';

@Controller('venueptypes')
export class VenueptypesController {
  constructor(private readonly venueptypesService: VenueptypesService) {}

  @Post()
  create(@Body() createVenueptypeDto: CreateVenueptypeDto) {
    return this.venueptypesService.create(createVenueptypeDto);
  }

  @Get()
  findAll() {
    return this.venueptypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueptypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueptypeDto: UpdateVenueptypeDto) {
    return this.venueptypesService.update(id, updateVenueptypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueptypesService.remove(id);
  }
}
