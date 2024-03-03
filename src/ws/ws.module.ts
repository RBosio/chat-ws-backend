import { Module } from "@nestjs/common"
import { WsService } from "./ws.service"
import { WsGateway } from "./ws.gateway"
import { MessageModule } from "src/message/message.module"

@Module({
  imports: [MessageModule],
  providers: [WsGateway, WsService],
})
export class WsModule {}
