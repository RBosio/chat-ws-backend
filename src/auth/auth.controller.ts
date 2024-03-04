import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { AuthGuard } from "./auth.guard"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { User } from "src/entities/user.entity"
import { Response } from "express"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "create user" })
  @ApiResponse({
    status: 201,
    description: "user created",
  })
  @ApiResponse({
    status: 409,
    description: "conflict",
  })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto)
  }

  @Post("login")
  @ApiOperation({ summary: "login user" })
  @ApiResponse({
    status: 201,
    description: "user logged",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBody({ type: LoginUserDto })
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(loginUserDto, res)
  }

  @Post("logout")
  @ApiOperation({ summary: "logout" })
  @ApiResponse({
    status: 200,
    description: "logout",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    return this.authService.logout(res)
  }

  @Get("profile")
  @ApiOperation({ summary: "get profile user" })
  @ApiResponse({
    status: 200,
    description: "user profile",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  profile(@Req() req): User {
    return req.user
  }
}
