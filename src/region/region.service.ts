import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./schemas/region.schema";
import { Model } from "mongoose";

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private reggionSchema: Model<Region>) {}

  create(createRegionDto: CreateRegionDto) {
    return this.reggionSchema.create(createRegionDto);
  }

  findAll(): Promise<Region[]> {
    return this.reggionSchema.find().populate("districts");
  }

  findOne(id: string) {
    const region = this.reggionSchema.findById(id);
    if (!region) {
      throw new NotFoundException("Regin topilmadi");
    }
    return region;
  }

  update(id: string, updateRegionDto: UpdateRegionDto) {
    const update = this.reggionSchema.findByIdAndUpdate(id, updateRegionDto);
    if (!update) {
      throw new NotFoundException("Regin topilmadi");
    }
    return update;
  }

  remove(id: string) {
    const dele = this.reggionSchema.findByIdAndDelete(id);
    if (!dele) {
      throw new NotFoundException("Regin topilmadi");
    }
    return dele;
  }
}
