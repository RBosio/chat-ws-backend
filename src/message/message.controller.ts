import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { AuthGuard } from "src/auth/auth.guard"
import { MessageService } from "./message.service"
import { CreateMessageDto } from "./dto/create-message.dto"
import { Message } from "src/entities/message.entity"
import { UpdateMessageDto } from "./dto/update-message.dto"

@ApiTags("message")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: "create message" })
  @ApiResponse({
    status: 201,
    description: "message created",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBody({ type: CreateMessageDto })
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(createMessageDto)
  }

  @Get()
  @ApiOperation({ summary: "get all messages" })
  @ApiResponse({
    status: 200,
    description: "get all messages",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  findAll(): Promise<Message[]> {
    return this.messageService.findAll()
  }

  @Patch(":messageId")
  @ApiOperation({ summary: "edit message" })
  @ApiResponse({
    status: 200,
    description: "message updated",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "message not found",
  })
  @ApiParam({
    name: "messageId",
    type: "number",
    example: 1,
  })
  update(
    @Param("messageId") messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return this.messageService.update(+messageId, updateMessageDto)
  }
}
