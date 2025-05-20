import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenueptypeDto } from "./dto/create-venueptype.dto";
import { UpdateVenueptypeDto } from "./dto/update-venueptype.dto";
import { Venueptype } from "./schemas/venueptype.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenueptypesService {
  constructor(
    @InjectModel(Venueptype.name) private venueptypeModel: Model<Venueptype>
  ) {}

  create(createVenueptypeDto: CreateVenueptypeDto) {
    return this.venueptypeModel.create({ ...createVenueptypeDto });
  }

  findAll() {
    return this.venueptypeModel.find();
  }

  findOne(id: string) {
    const venueptype = this.venueptypeModel.findById(id);
    if (!venueptype) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return venueptype;
  }

  update(id: string, updateVenueptypeDto: UpdateVenueptypeDto) {
    const updated = this.venueptypeModel.findByIdAndUpdate(
      id,
      updateVenueptypeDto
    );
    if (!updated) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return updated;
  }

  remove(id: string) {
    const deleted = this.venueptypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return deleted;
  }
}
