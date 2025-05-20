import { Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginDto, res);
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logoutAdmin(req, res);
  }

  @Post("refresh_admin")
  @HttpCode(200)
  async refreshadmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshAdminToken(req, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Post("logincust")
  @HttpCode(200)
  async logincust(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logincustomer(loginDto, res);
  }

  @Post("logoutcust")
  @HttpCode(200)
  async logoutcust(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutCustomer(req, res);
  }

  @Post("refresh_cust")
  @HttpCode(200)
  async refreshadmincust(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshCustomerToken(req, res);
  }
}
