import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliverymethodDto } from './create-deliverymethod.dto';

export class UpdateDeliverymethodDto extends PartialType(CreateDeliverymethodDto) {}
