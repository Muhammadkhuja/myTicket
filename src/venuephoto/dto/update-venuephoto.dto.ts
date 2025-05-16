import { PartialType } from '@nestjs/mapped-types';
import { CreateVenuephotoDto } from './create-venuephoto.dto';

export class UpdateVenuephotoDto extends PartialType(CreateVenuephotoDto) {}
