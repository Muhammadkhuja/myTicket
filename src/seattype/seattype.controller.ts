import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeattypeService } from './seattype.service';
import { CreateSeattypeDto } from './dto/create-seattype.dto';
import { UpdateSeattypeDto } from './dto/update-seattype.dto';

@Controller('seattype')
export class SeattypeController {
  constructor(private readonly seattypeService: SeattypeService) {}

  @Post()
  create(@Body() createSeattypeDto: CreateSeattypeDto) {
    return this.seattypeService.create(createSeattypeDto);
  }

  @Get()
  findAll() {
    return this.seattypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seattypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeattypeDto: UpdateSeattypeDto) {
    return this.seattypeService.update(+id, updateSeattypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seattypeService.remove(+id);
  }
}
