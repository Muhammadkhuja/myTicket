import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumancategoryService } from './humancategory.service';
import { CreateHumancategoryDto } from './dto/create-humancategory.dto';
import { UpdateHumancategoryDto } from './dto/update-humancategory.dto';

@Controller('humancategory')
export class HumancategoryController {
  constructor(private readonly humancategoryService: HumancategoryService) {}

  @Post()
  create(@Body() createHumancategoryDto: CreateHumancategoryDto) {
    return this.humancategoryService.create(createHumancategoryDto);
  }

  @Get()
  findAll() {
    return this.humancategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humancategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumancategoryDto: UpdateHumancategoryDto) {
    return this.humancategoryService.update(+id, updateHumancategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humancategoryService.remove(+id);
  }
}
