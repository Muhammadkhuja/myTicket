import { PartialType } from '@nestjs/mapped-types';
import { CreateHumancategoryDto } from './create-humancategory.dto';

export class UpdateHumancategoryDto extends PartialType(CreateHumancategoryDto) {}
