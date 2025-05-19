import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketstatusDto } from "./dto/create-ticketstatus.dto";
import { UpdateTicketstatusDto } from "./dto/update-ticketstatus.dto";
import { Ticketstatus } from "./schemas/ticketstatus.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TicketstatusService {
  constructor(
    @InjectModel(Ticketstatus.name)
    private ticketstatusModel: Model<Ticketstatus>
  ) {}

  create(createTicketstatusDto: CreateTicketstatusDto) {
    return this.ticketstatusModel.create({ ...createTicketstatusDto });
  }

  findAll() {
    return this.ticketstatusModel.find();
  }

  findOne(id: string) {
    const ticketstatus = this.ticketstatusModel.findById(id);
    if (!ticketstatus) {
      throw new NotFoundException("Ticketstatus topilmadi");
    }
  }

  update(id: string, updateTicketstatusDto: UpdateTicketstatusDto) {
    const updated = this.ticketstatusModel.findByIdAndUpdate(
      id,
      updateTicketstatusDto
    );
    if (!updated) {
      throw new NotFoundException("Ticketstatus topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.ticketstatusModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Ticketstatus topilmadi");
    }
  }
}
