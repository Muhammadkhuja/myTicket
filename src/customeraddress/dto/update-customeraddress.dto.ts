import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomeraddressDto } from './create-customeraddress.dto';

export class UpdateCustomeraddressDto extends PartialType(CreateCustomeraddressDto) {}
