import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSeattypeDto } from "./dto/create-seattype.dto";
import { UpdateSeattypeDto } from "./dto/update-seattype.dto";
import { Seattype } from "./schemas/seattype.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SeattypeService {
  constructor(
    @InjectModel(Seattype.name) private seattypeModel: Model<Seattype>
  ) {}

  create(createSeattypeDto: CreateSeattypeDto) {
    return this.seattypeModel.create({ ...createSeattypeDto });
  }

  findAll() {
    return this.seattypeModel.find();
  }

  findOne(id: string) {
    const seattype = this.seattypeModel.findById(id);
    if (!seattype) {
      throw new NotFoundException("Seattype topilmadi");
    }
    return seattype;
  }

  update(id: string, updateSeattypeDto: UpdateSeattypeDto) {
    const updated = this.seattypeModel.findByIdAndUpdate(id, updateSeattypeDto);
    if (!updated) {
      throw new NotFoundException("Seattype topilmadi");
    }
    return updated;
  }

  remove(id: string) {
    const deleted = this.seattypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Seattype topilmadi");
    }
    return deleted;
  }
}
