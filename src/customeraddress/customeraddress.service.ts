import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomeraddressDto } from './dto/create-customeraddress.dto';
import { UpdateCustomeraddressDto } from './dto/update-customeraddress.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerAddress } from './schemas/customeraddress.schemas';
import { Model } from 'mongoose';

@Injectable()
export class CustomeraddressService {
  constructor(
    @InjectModel(CustomerAddress.name) private customeraddressSchema: Model<CustomerAddress>
  ){}


  create(createCustomeraddressDto: CreateCustomeraddressDto) {
    return this.customeraddressSchema.create(createCustomeraddressDto)
  }

  findAll(): Promise<CustomerAddress[]> {
    return this.customeraddressSchema.find().populate("cutomer_id");
  }

  findOne(id: string) {
    const customercard = this.customeraddressSchema.findById(id)
    if(!customercard){
      throw new NotFoundException("Customer address topilmadi")
    }
  }

  update(id: string, updateCustomeraddressDto: UpdateCustomeraddressDto) {
    const update = this.customeraddressSchema.findByIdAndUpdate(id, updateCustomeraddressDto)
    if(!update){
      throw new NotFoundException("Customer address topilmadi")
    }
  }

  remove(id: string) {
    const delet = this.customeraddressSchema.findByIdAndDelete(id);
    if(!delet){
      throw new NotFoundException("Customer address topilmadi")
    }
  }
}
