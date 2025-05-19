import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketstatusDto } from './create-ticketstatus.dto';

export class UpdateTicketstatusDto extends PartialType(CreateTicketstatusDto) {}
