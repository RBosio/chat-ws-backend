import { WebSocketGateway } from "@nestjs/websockets"
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
@WebSocketGateway({
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket, ...args: any[]) {
    return client.id
  }

  handleDisconnect(client: Socket) {
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
    client.leave(`group_${groupId.toString()}`)
    return `leaved group id: ${groupId}`
  }
}
