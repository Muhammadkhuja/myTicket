import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenuephotoDto } from "./dto/create-venuephoto.dto";
import { UpdateVenuephotoDto } from "./dto/update-venuephoto.dto";
import { Venuephoto } from "./schemas/venuephoto.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenuephotoService {
  constructor(
    @InjectModel(Venuephoto.name) private venuephotoModel: Model<Venuephoto>
  ) {}

  create(createVenuephotoDto: CreateVenuephotoDto) {
    return this.venuephotoModel.create({ ...createVenuephotoDto });
  }

  findAll() {
    return this.venuephotoModel.find();
  }

  findOne(id: string) {
    const venuephoto = this.venuephotoModel.findById(id);
    if (!venuephoto) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return venuephoto;
  }

  update(id: string, updateVenuephotoDto: UpdateVenuephotoDto) {
    const updated = this.venuephotoModel.findByIdAndUpdate(
      id,
      updateVenuephotoDto
    );
    if (!updated) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return updated;
  }

  remove(id: string) {
    const deleted = this.venuephotoModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return deleted;
  }
}
