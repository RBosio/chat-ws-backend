import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { RoomService } from "./room.service"
import { CreateRoomDto } from "./dto/create-room.dto"

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  addFriend(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.addFriend(createRoomDto)
  }

  @Patch(":idR/:idS")
  acceptFriend(
    @Param("idR") userReceiveId: string,
    @Param("idS") userSendId: string,
  ) {
    return this.roomService.acceptFriend(+userReceiveId, +userSendId)
  }

  @Patch("cancel/:idR/:idS")
  cancel(
    @Param("idR") userReceiveId: string,
    @Param("idS") userSendId: string,
  ) {
    return this.roomService.cancel(+userReceiveId, +userSendId)
  }
}
