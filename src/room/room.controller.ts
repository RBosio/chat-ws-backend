import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
} from "@nestjs/common"
import { RoomService } from "./room.service"
import { CreateRoomDto } from "./dto/create-room.dto"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { UserRoom } from "src/entities/userRoom.entity"
import { AuthGuard } from "src/auth/auth.guard"

@ApiTags("room")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({
    summary: "add new friend",
  })
  @ApiResponse({
    status: 201,
    description: "friend request send",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "user not found",
  })
  @ApiBody({ type: CreateRoomDto })
  addFriend(@Body() createRoomDto: CreateRoomDto): Promise<UserRoom> {
    return this.roomService.addFriend(createRoomDto)
  }

  @Get(":roomId")
  @ApiOperation({ summary: "find all comments by room" })
  @ApiResponse({
    status: 200,
    description: "get all comments by room",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "friend request not found",
  })
  @ApiParam({
    name: "roomId",
    type: "string",
    example: 1,
  })
  findCommentsByRoom(@Param("roomId") roomId: string): Promise<UserRoom> {
    return this.roomService.findCommentsByRoom(+roomId)
  }

  @Patch(":roomId")
  @ApiOperation({ summary: "accept friend request" })
  @ApiResponse({
    status: 200,
    description: "friend request accepted",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "friend request not found",
  })
  @ApiParam({
    name: "roomId",
    type: "string",
    example: 1,
  })
  acceptFriend(@Param("roomId") roomId: string): Promise<UserRoom> {
    return this.roomService.acceptFriend(+roomId)
  }

  @Patch("cancel/:roomId")
  @ApiOperation({ summary: "reject friend request" })
  @ApiResponse({
    status: 200,
    description: "friend request rejected",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "friend request not found",
  })
  @ApiParam({
    name: "roomId",
    type: "string",
    example: 1,
  })
  cancel(@Param("roomId") roomId: string): Promise<UserRoom> {
    return this.roomService.cancel(+roomId)
  }
}
