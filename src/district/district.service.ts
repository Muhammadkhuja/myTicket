import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schemas";
import { Model, isValidObjectId } from "mongoose";
import { RegionService } from "../region/region.service";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const { region_id } = createDistrictDto;
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Region ID noto'gri");
    }
    const region = await this.regionSchema.findById(region_id);
    if (!region) {
      throw new BadRequestException("Bunday Region yoq");
    }
    const district = await this.regionSchema.create(createDistrictDto);
    region.districts.push(district.id);
    await region.save();
    return district;
  }

  findAll(): Promise<District[]> {
    return this.districtSchema.find().populate("region_id");
  }

  findOne(id: string) {
    const district = this.districtSchema.findById(id);
    if (!district) {
      throw new NotFoundException("District topilmadi");
    }
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    const update = this.districtSchema.findByIdAndUpdate(id, updateDistrictDto);
    if (!update) {
      throw new NotFoundException("District topilmadi");
    }
  }

  remove(id: string) {
    const delet = this.districtSchema.findByIdAndDelete(id);
    if (!delet) {
      throw new NotFoundException("District topilmadi");
    }
  }
}
