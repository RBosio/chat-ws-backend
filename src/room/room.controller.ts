import { Controller, Post, Body, Patch, Param, Get } from "@nestjs/common"
import { RoomService } from "./room.service"
import { CreateRoomDto } from "./dto/create-room.dto"

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  addFriend(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.addFriend(createRoomDto)
  }

  @Get(":userRoomId")
  findCommentsByRoom(@Param("userRoomId") userRoomId: string) {
    return this.roomService.findCommentsByRoom(+userRoomId)
  }

  @Patch(":id")
  acceptFriend(@Param("id") id: string) {
    return this.roomService.acceptFriend(+id)
  }

  @Patch("cancel/:id")
  cancel(@Param("id") id: string) {
    return this.roomService.cancel(+id)
  }
}
