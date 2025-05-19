import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeliverymethodDto } from "./dto/create-deliverymethod.dto";
import { UpdateDeliverymethodDto } from "./dto/update-deliverymethod.dto";
import { Deliverymethod } from "./schemas/deliverymethod.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DeliverymethodService {
  constructor(
    @InjectModel(Deliverymethod.name)
    private deliverymethodModel: Model<Deliverymethod>
  ) {}

  create(createDeliverymethodDto: CreateDeliverymethodDto) {
    return this.deliverymethodModel.create({ ...createDeliverymethodDto });
  }

  findAll() {
    return this.deliverymethodModel.find();
  }

  findOne(id: string) {
    const item = this.deliverymethodModel.findById(id);
    if (!item) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }

  update(id: string, updateDeliverymethodDto: UpdateDeliverymethodDto) {
    const updated = this.deliverymethodModel.findByIdAndUpdate(
      id,
      updateDeliverymethodDto
    );
    if (!updated) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.deliverymethodModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }
}
