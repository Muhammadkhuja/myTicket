import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin, AdminDocument } from "./schemas/admin.schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminSchema: Model<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const admin = await this.adminSchema.findOne({ email });
    if (admin) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  findAll(): Promise<Admin[]> {
    return this.adminSchema.find();
  }

  findOne(id: string) {
    const admid = this.adminSchema.findById(id);
    if (!admid) {
      throw new NotFoundException("Admin topilmadi");
    }
    return admid;
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    const updates = this.adminSchema.findByIdAndUpdate(id, updateAdminDto);
    if (!updates) {
      throw new NotFoundException("Admin topilmadi");
    }
    return updates;
  }

  remove(id: string) {
    return this.adminSchema.findByIdAndUpdate(id);
    // return this.adminSchema.deleteOne({_id: id});
  }

  async findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  async findAdminByRefresh(refresh_token: string) {
    const admins = await this.adminSchema.find();

    for (const admin of admins) {
      const storedToken = admin.refresh_token;

      if (!storedToken) continue;

      const match = await bcrypt.compare(refresh_token, storedToken);
      if (match) return admin;
    }
    return null;
  }
}
