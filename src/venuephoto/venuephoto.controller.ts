import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenuephotoService } from './venuephoto.service';
import { CreateVenuephotoDto } from './dto/create-venuephoto.dto';
import { UpdateVenuephotoDto } from './dto/update-venuephoto.dto';

@Controller('venuephoto')
export class VenuephotoController {
  constructor(private readonly venuephotoService: VenuephotoService) {}

  @Post()
  create(@Body() createVenuephotoDto: CreateVenuephotoDto) {
    return this.venuephotoService.create(createVenuephotoDto);
  }

  @Get()
  findAll() {
    return this.venuephotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuephotoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenuephotoDto: UpdateVenuephotoDto) {
    return this.venuephotoService.update(id, updateVenuephotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuephotoService.remove(id);
  }
}
