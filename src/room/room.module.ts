import { Module } from "@nestjs/common"
import { RoomService } from "./room.service"
import { RoomController } from "./room.controller"
import { UserModule } from "src/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserRoom } from "src/entities/userRoom.entity"

@Module({
  imports: [TypeOrmModule.forFeature([UserRoom]), UserModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
