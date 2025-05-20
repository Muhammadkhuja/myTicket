import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHumancategoryDto } from "./dto/create-humancategory.dto";
import { UpdateHumancategoryDto } from "./dto/update-humancategory.dto";
import { Humancategory } from "./schemas/humancategory.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class HumancategoryService {
  constructor(
    @InjectModel(Humancategory.name)
    private humancategoryModel: Model<Humancategory>
  ) {}

  create(createHumancategoryDto: CreateHumancategoryDto) {
    return this.humancategoryModel.create({ ...createHumancategoryDto });
  }

  findAll() {
    return this.humancategoryModel.find();
  }

  findOne(id: string) {
    const humancategory = this.humancategoryModel.findById(id);
    if (!humancategory) {
      throw new NotFoundException("Humancategory topilmadi");
    }
    return humancategory;
  }

  update(id: string, updateHumancategoryDto: UpdateHumancategoryDto) {
    const updated = this.humancategoryModel.findByIdAndUpdate(
      id,
      updateHumancategoryDto
    );
    if (!updated) {
      throw new NotFoundException("Humancategory topilmadi");
    }
    return updated;
  }

  remove(id: string) {
    const deleted = this.humancategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Humancategory topilmadi");
    }
    return deleted;
  }
}
