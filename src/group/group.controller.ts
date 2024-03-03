import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common"
import { GroupService } from "./group.service"
import { CreateGroupDto } from "./dto/create-group.dto"
import { UpdateGroupDto } from "./dto/update-group.dto"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { AuthGuard } from "src/auth/auth.guard"
import { User } from "src/entities/user.entity"

@ApiTags("group")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: "create new group" })
  @ApiResponse({
    status: 201,
    description: "group created",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBody({ type: CreateGroupDto })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto)
  }

  @Patch(":groupId/users")
  @ApiOperation({ summary: "add users group" })
  @ApiResponse({
    status: 200,
    description: "user added",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBody({ type: User })
  modifyUsersGroup(@Param("groupId") groupId: number, @Body() user: User) {
    return this.groupService.addUser(groupId, user)
  }

  @Patch(":groupId")
  @ApiOperation({ summary: "update name of group" })
  @ApiResponse({
    status: 200,
    description: "name updated",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "group not found",
  })
  update(
    @Param("groupId") groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(+groupId, updateGroupDto)
  }

  @Delete(":groupId")
  @ApiOperation({ summary: "remove group" })
  @ApiResponse({
    status: 200,
    description: "group removed",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "group not found",
  })
  remove(@Param("groupId") groupId: string) {
    return this.groupService.remove(+groupId)
  }
}
