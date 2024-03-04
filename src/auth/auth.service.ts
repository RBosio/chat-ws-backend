import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { compare } from "bcryptjs"
import { User } from "src/entities/user.entity"
import { Response } from "express"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto)
  }

  async login(loginUserDto: LoginUserDto, res: Response): Promise<any> {
    const user = await this.userService.findOneByEmail(loginUserDto.email)

    if (!user) {
      throw new UnauthorizedException()
    }

    if (!(await compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id }
    const token = await this.jwtService.signAsync(payload)

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: "ok" })
  }

  async logout(res: Response) {
    res.clearCookie("token")

    return res.status(200).json({
      message: "Cierre de sesion exitoso",
    })
  }
}
