import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartitemDto } from "./dto/create-cartitem.dto";
import { UpdateCartitemDto } from "./dto/update-cartitem.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cartitem } from "./schemas/cartitem.schema"; // schema joylashgan joyini tekshirib qo'ying

@Injectable()
export class CartitemService {
  constructor(
    @InjectModel(Cartitem.name) private cartitemModel: Model<Cartitem>
  ) {}

  create(createCartitemDto: CreateCartitemDto) {
    return this.cartitemModel.create({ ...createCartitemDto });
  }

  findAll() {
    return this.cartitemModel.find().populate("cart_id product_id"); // kerakli populate maydonlarini yozing
  }

  async findOne(id: string) {
    const cartitem = await this.cartitemModel.findById(id);
    if (!cartitem) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return cartitem;
  }

  async update(id: string, updateCartitemDto: UpdateCartitemDto) {
    const updated = await this.cartitemModel.findByIdAndUpdate(
      id,
      updateCartitemDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cartitemModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return deleted;
  }
}
