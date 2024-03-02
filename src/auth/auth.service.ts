import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { compare } from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginUserDto.email)

    if (!user) {
      throw new UnauthorizedException()
    }

    if (!(await compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}
