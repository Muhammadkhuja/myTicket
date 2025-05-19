import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketstatusService } from './ticketstatus.service';
import { CreateTicketstatusDto } from './dto/create-ticketstatus.dto';
import { UpdateTicketstatusDto } from './dto/update-ticketstatus.dto';

@Controller('ticketstatus')
export class TicketstatusController {
  constructor(private readonly ticketstatusService: TicketstatusService) {}

  @Post()
  create(@Body() createTicketstatusDto: CreateTicketstatusDto) {
    return this.ticketstatusService.create(createTicketstatusDto);
  }

  @Get()
  findAll() {
    return this.ticketstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketstatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketstatusDto: UpdateTicketstatusDto) {
    return this.ticketstatusService.update(id, updateTicketstatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketstatusService.remove(id);
  }
}
