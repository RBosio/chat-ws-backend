import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { AuthGuard } from "./auth.guard"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get("profile")
  @UseGuards(AuthGuard)
  profile(@Req() req) {
    return req.user
  }
}
