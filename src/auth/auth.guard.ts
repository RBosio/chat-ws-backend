import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./constants"
import { Request } from "express"
import { UserService } from "src/user/user.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    const tokenC = this.extractTokenFromCookie(request)

    if (!token && !tokenC) {
      throw new UnauthorizedException()
    }
    try {
      let payload
      if (token) {
        payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        })
      } else {
        payload = await this.jwtService.verifyAsync(tokenC, {
          secret: jwtConstants.secret,
        })
      }

      const user = await this.userService.findOne(payload.sub)
      request["user"] = user
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const [type, token] =
      request.rawHeaders.filter((c) => c.includes("token"))[0]?.split("=") ?? []
    return type === "token" ? token : undefined
  }
}
