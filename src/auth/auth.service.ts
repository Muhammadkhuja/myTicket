import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminDocument } from "../admin/schemas/admin.schemas";
import { LoginDto } from "./dto/login.dto";
import { AdminService } from "../admin/admin.service";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CustomerService } from "../customer/customer.service";
import { CustomerDocument } from "../customer/schemas/customer.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly cutomerService: CustomerService
  ) {}

  async AdmingenerateToken(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async CustomergenerateToken(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      phone: customer.phone_number,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki parol xato 2");
    }

    const { accessToken, refreshToken } = await this.AdmingenerateToken(admin);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = refresh_token;
    await admin.save();
    return {
      message: "Xush kelibsiz",
      adminId: admin._id,
      accessToken,
    };
  }

  async logoutAdmin(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new BadRequestException("Token yo'q yoki noto'g'ri");
    }

    const admin = await this.adminService.findAdminByRefresh(refreshToken);

    if (!admin) {
      throw new BadRequestException("Token noto'g'ri yoki admin topilmadi");
    }

    admin.refresh_token = "";
    await admin.save();

    res.clearCookie("refreshToken");

    return { message: "Muvoffaqiyatli chiqib ketdingiz" };
  }

  async refreshAdminToken(req: Request, res: Response) {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw new UnauthorizedException("Token mavjud emas");
    }

    const admin = await this.adminService.findAll();
    const foundAdmin = admin.find(async (adm) => {
      if (!adm.refresh_token) return false;
      return await bcrypt.compare(oldRefreshToken, adm.refresh_token);
    });

    if (!foundAdmin) {
      throw new ForbiddenException("Refresh token yaroqsiz");
    }

    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const { accessToken, refreshToken } = await this.AdmingenerateToken(
        foundAdmin as AdminDocument
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });

      const hashedRefresh = await bcrypt.hash(refreshToken, 7);
      foundAdmin.refresh_token = hashedRefresh;
      await foundAdmin.save();

      return {
        accessToken,
        message: "Yangi tokenlar muvaffaqiyatli yaratildi",
      };
    } catch (error) {
      throw new ForbiddenException("Token yaroqsiz yoki muddati o'tgan");
    }
  }

  //-------------------------------------------------------------------------------------------------

  async logincustomer(loginDto: LoginDto, res: Response) {
    const customer = await this.cutomerService.findByEmail(loginDto.email);
    console.log(customer);
    
    if (!customer) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      customer.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki parol xato 2");
    }

    const { accessToken, refreshToken } =
      await this.CustomergenerateToken(customer);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const refresh_token = await bcrypt.hash(refreshToken, 7);
    customer.refresh_token = refresh_token;
    await customer.save();
    return {
      message: "Xush kelibsiz",
      customerId: customer._id,
      accessToken,
    };
  }

  async logoutCustomer(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new BadRequestException("Token yo'q yoki noto'g'ri");
    }

    const customer =
      await this.cutomerService.findCustomerByRefresh(refreshToken);

    if (!customer) {
      throw new BadRequestException("Token noto'g'ri yoki customer topilmadi");
    }

    customer.refresh_token = "";
    await customer.save();

    res.clearCookie("refreshToken");

    return { message: "Muvoffaqiyatli chiqib ketdingiz" };
  }

  async refreshCustomerToken(req: Request, res: Response) {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw new UnauthorizedException("Token mavjud emas");
    }

    const customer = await this.cutomerService.findAll();
    const foundCustomer = customer.find(async (cust) => {
      if (!cust.refresh_token) return false;
      return await bcrypt.compare(oldRefreshToken, cust.refresh_token);
    });

    if (!foundCustomer) {
      throw new ForbiddenException("Refresh token yaroqsiz");
    }

    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const { accessToken, refreshToken } = await this.CustomergenerateToken(
        foundCustomer as CustomerDocument
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });

      const hashedRefresh = await bcrypt.hash(refreshToken, 7);
      foundCustomer.refresh_token = hashedRefresh;
      await foundCustomer.save();

      return {
        accessToken,
        message: "Yangi tokenlar muvaffaqiyatli yaratildi",
      };
    } catch (error) {
      throw new ForbiddenException("Token yaroqsiz yoki muddati o'tgan");
    }
  }
}
