import { Module } from "@nestjs/common"
import { MessageController } from "./message.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "src/user/user.module"
import { Message } from "src/entities/message.entity"
import { MessageService } from "./message.service"

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
