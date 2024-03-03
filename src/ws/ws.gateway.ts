import { WebSocketGateway } from "@nestjs/websockets"
import { WsService } from "./ws.service"
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly wsService: WsService) {}

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket, ...args: any[]) {
    console.log("connected:", client.id)
    return client.id
  }

  handleDisconnect(client: Socket) {
    console.log("disconnected:", client.id)
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
      groupId: number
      message: string
    },
  ) {
    try {
      const userId = await this.wsService.findUser(
        client.handshake.headers.authorization,
      )

      this.server
        .to(`group_${payload.groupId.toString()}`)
        .emit("message", payload.message)

      return this.wsService.saveMessage({ ...payload, userSendId: userId })
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
