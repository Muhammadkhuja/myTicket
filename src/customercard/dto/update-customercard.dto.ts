import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomercardDto } from './create-customercard.dto';

export class UpdateCustomercardDto extends PartialType(CreateCustomercardDto) {}
