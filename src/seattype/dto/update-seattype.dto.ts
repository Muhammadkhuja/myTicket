import { PartialType } from '@nestjs/mapped-types';
import { CreateSeattypeDto } from './create-seattype.dto';

export class UpdateSeattypeDto extends PartialType(CreateSeattypeDto) {}
