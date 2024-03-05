import { UseGuards } from "@nestjs/common"
import { WebSocketGateway, WsException } from "@nestjs/websockets"
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "src/auth/constants"
@WebSocketGateway({
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService) {}

  usersOnline = []

  @WebSocketServer()
  server: Server

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.cookie?.split("=")[1]

    if (!token) {
      return console.error("error")
    }
    try {
      const { sub } = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })

      if (!this.usersOnline.includes(sub)) {
        this.usersOnline.push(sub)
      }

      client.join("default")

      this.server.to("default").emit("users", this.usersOnline.toString())
    } catch {
      return console.error("error")
    }

    return client.id
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.headers.cookie?.split("=")[1]

    if (!token) {
      return console.error("error")
    }
    try {
      const { sub } = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })

      client.leave("default")
      this.usersOnline = this.usersOnline.filter((id) => id !== sub)

      if (this.usersOnline.length === 0) {
        this.server.to("default").emit("users", [])
      } else {
        this.server.to("default").emit("users", this.usersOnline.toString())
      }
    } catch {
      return console.error("error")
    }

    return client.id
  }

  @SubscribeMessage("join")
  joinGroup(client: Socket, groupId: number) {
    client.join(`group_${groupId.toString()}`)
    return `joined group id: ${groupId}`
  }

  @SubscribeMessage("message")
  async sendMessage(
    client: Socket,
    payload: {
      userId: number
      groupId: number
      message: string
    },
  ) {
    try {
      this.server.to(`group_${payload.groupId.toString()}`).emit("message", {
        message: payload.message,
        userId: payload.userId,
        created_at: new Date(),
      })
    } catch (error) {
      return error
    }
  }

  @SubscribeMessage("leave")
  endGroup(client: Socket, groupId: number) {
    if (groupId) {
      client.leave(`group_${groupId.toString()}`)
    }
    return `leaved group id: ${groupId}`
  }
}
