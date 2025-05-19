import { PartialType } from '@nestjs/mapped-types';
import { CreateEventypeDto } from './create-eventype.dto';

export class UpdateEventypeDto extends PartialType(CreateEventypeDto) {}
