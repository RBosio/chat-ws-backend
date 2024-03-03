import { Injectable } from "@nestjs/common"
import { MessageService } from "src/message/message.service"
import { WsException } from "@nestjs/websockets"
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "src/auth/constants"
import { Message } from "src/entities/message.entity"

@Injectable()
export class WsService {
  constructor(
    private messageService: MessageService,
    private jwtService: JwtService,
  ) {}

  async findUser(token: string): Promise<number> {
    try {
      const payload = await this.jwtService.verifyAsync(token.split(" ")[1], {
        secret: jwtConstants.secret,
      })

      return payload.sub
    } catch (error) {
      throw new WsException(error)
    }
  }

  async saveMessage({ groupId, message, userSendId }): Promise<Message> {
    try {
      return this.messageService.create({
        groupId,
        message,
        userSendId,
      })
    } catch (error) {
      return error
    }
  }
}
