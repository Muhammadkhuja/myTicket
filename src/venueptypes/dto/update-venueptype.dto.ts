import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueptypeDto } from './create-venueptype.dto';

export class UpdateVenueptypeDto extends PartialType(CreateVenueptypeDto) {}
