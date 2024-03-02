import { Controller, Get, Body, Patch, Param, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { User } from "src/entities/user.entity"
import { AuthGuard } from "src/auth/auth.guard"

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "find all users" })
  @ApiResponse({
    status: 200,
    description: "get all users",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(":userId")
  @ApiOperation({ summary: "find user" })
  @ApiResponse({
    status: 200,
    description: "get user",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "user not found",
  })
  @ApiParam({
    name: "userId",
    type: "string",
    example: 1,
  })
  findOne(@Param("userId") userId: string): Promise<User> {
    return this.userService.findOne(+userId)
  }

  @Patch(":userId")
  @ApiOperation({ summary: "update user" })
  @ApiResponse({
    status: 200,
    description: "user updated",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "user not found",
  })
  @ApiParam({
    name: "userId",
    type: "string",
    example: 1,
  })
  update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+userId, updateUserDto)
  }
}
