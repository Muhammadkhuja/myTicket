import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerSchema: Model<Customer>,
    private readonly jwtService: JwtService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password, email } = createCustomerDto;
    const customer = await this.customerSchema.findOne({ email });
    if (customer) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.customerSchema.create({
      ...createCustomerDto,
      hashed_password,
    });
  }

  findAll(): Promise<Customer[]> {
    return this.customerSchema.find();
  }

  findOne(id: string) {
    const admid = this.customerSchema.findById(id);
    if (!admid) {
      throw new NotFoundException("Customer topilmadi");
    }
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updates = this.customerSchema.findByIdAndUpdate(
      id,
      updateCustomerDto
    );
    if (!updates) {
      throw new NotFoundException("Customer topilmadi");
    }
  }

  remove(id: string) {
    return this.customerSchema.findByIdAndUpdate(id);
    // return this.customerSchema.deleteOne({_id: id});
  }

  async findByEmail(email: string) {
    return this.customerSchema.findOne({ email });
  }

  async findCustomerByRefresh(refresh_token: string) {
    const customers = await this.customerSchema.find();

    for (const customer of customers) {
      const storedToken = customer.refresh_token;

      if (!storedToken) continue;

      const match = await bcrypt.compare(refresh_token, storedToken);
      if (match) return customer;
    }
    return null;
  }
}
