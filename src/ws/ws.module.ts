import { Module } from "@nestjs/common"
import { WsGateway } from "./ws.gateway"
import { MessageModule } from "src/message/message.module"

@Module({
  imports: [MessageModule],
  providers: [WsGateway],
})
export class WsModule {}
