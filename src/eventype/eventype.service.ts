import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventypeDto } from "./dto/create-eventype.dto";
import { UpdateEventypeDto } from "./dto/update-eventype.dto";
import { Eventype } from "./schemas/eventype.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EventypeService {
  constructor(
    @InjectModel(Eventype.name) private eventypeModel: Model<Eventype>
  ) {}

  create(createEventypeDto: CreateEventypeDto) {
    return this.eventypeModel.create({ ...createEventypeDto });
  }

  findAll() {
    return this.eventypeModel.find();
  }

  findOne(id: string) {
    const eventype = this.eventypeModel.findById(id);
    if (!eventype) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }

  update(id: string, updateEventypeDto: UpdateEventypeDto) {
    const updated = this.eventypeModel.findByIdAndUpdate(id, updateEventypeDto);
    if (!updated) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.eventypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }
}
