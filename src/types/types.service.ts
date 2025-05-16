import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type } from "./schemas/type.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  create(createTypeDto: CreateTypeDto) {
    return this.typeModel.create({ ...createTypeDto });
  }

  findAll() {
    return this.typeModel.find();
  }

  findOne(id: string) {
    const type = this.typeModel.findById(id);
    if (!type) {
      throw new NotFoundException("Type topilmadi");
    }
  }

  update(id: string, updateTypeDto: UpdateTypeDto) {
    const updated = this.typeModel.findByIdAndUpdate(id, updateTypeDto);
    if (!updated) {
      throw new NotFoundException("Type topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.typeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Type topilmadi");
    }
  }
}
