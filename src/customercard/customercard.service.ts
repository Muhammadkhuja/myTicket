import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomercardDto } from "./dto/create-customercard.dto";
import { UpdateCustomercardDto } from "./dto/update-customercard.dto";
import { CustomerCard } from "./schemas/customercard.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CustomercardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private customecardSchema: Model<CustomerCard>,
    private readonly jwtService: JwtService
  ) {}

  create(createCustomercardDto: CreateCustomercardDto) {
    return this.customecardSchema.create({ createCustomercardDto });
  }

  findAll(): Promise<CustomerCard[]> {
    return this.customecardSchema.find().populate("cutomer_id");
  }

  findOne(id: string) {
    const customercard = this.customecardSchema.findById(id);
    if (!customercard) {
      throw new NotFoundException("Custome card topilmadi");
    }
    return customercard;
  }

  update(id: string, updateCustomercardDto: UpdateCustomercardDto) {
    const updates = this.customecardSchema.findByIdAndUpdate(
      id,
      updateCustomercardDto
    );
    if (!updates) {
      throw new NotFoundException("Custome card topilmadi");
    }
    return updates;
  }

  remove(id: string) {
    const delet = this.customecardSchema.findByIdAndDelete(id);
    if (!delet) {
      throw new NotFoundException("Custome card topilmadi");
    }
    return delet;
  }
}
