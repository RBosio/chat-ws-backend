import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
} from "@nestjs/common"
import { FriendRequestService } from "./friend-request.service"
import { AddFriendDto } from "./dto/add-friend.dto"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { AuthGuard } from "src/auth/auth.guard"
import { FriendRequest } from "src/entities/friendRequest.entity"

@ApiTags("friend")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("friend")
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

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
  @ApiBody({ type: AddFriendDto })
  addFriend(@Body() createRoomDto: AddFriendDto): Promise<FriendRequest> {
    return this.friendRequestService.addFriend(createRoomDto)
  }

  /* @Get(":friendId")
  @ApiOperation({ summary: "find all comments by friend" })
  @ApiResponse({
    status: 200,
    description: "get all comments by friend",
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
    name: "friendId",
    type: "string",
    example: 1,
  })
  findCommentsByRoom(
    @Param("friendId") friendId: string,
  ): Promise<FriendRequest> {
    return this.friendRequestService.findCommentsByRoom(+friendId)
  } */

  @Patch(":userId")
  @ApiOperation({ summary: "find friend requests" })
  @ApiResponse({
    status: 200,
    description: "get friend requests",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiParam({
    name: "userId",
    type: "number",
    example: 1,
  })
  getFriendRequests(@Param("userId") userId: string): Promise<FriendRequest[]> {
    return this.friendRequestService.getFriendRequests(+userId)
  }

  @Patch(":friendId")
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
    name: "friendId",
    type: "string",
    example: 1,
  })
  acceptFriend(@Param("friendId") friendId: string): Promise<FriendRequest> {
    return this.friendRequestService.acceptFriend(+friendId)
  }

  @Patch("cancel/:friendId")
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
    name: "friendId",
    type: "string",
    example: 1,
  })
  rejectFriend(@Param("friendId") friendId: string): Promise<FriendRequest> {
    return this.friendRequestService.rejectFriend(+friendId)
  }
}
