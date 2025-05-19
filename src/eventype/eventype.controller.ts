import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventypeService } from './eventype.service';
import { CreateEventypeDto } from './dto/create-eventype.dto';
import { UpdateEventypeDto } from './dto/update-eventype.dto';

@Controller('eventype')
export class EventypeController {
  constructor(private readonly eventypeService: EventypeService) {}

  @Post()
  create(@Body() createEventypeDto: CreateEventypeDto) {
    return this.eventypeService.create(createEventypeDto);
  }

  @Get()
  findAll() {
    return this.eventypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventypeDto: UpdateEventypeDto) {
    return this.eventypeService.update(+id, updateEventypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventypeService.remove(+id);
  }
}
