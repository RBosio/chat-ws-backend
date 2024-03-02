import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"
import { CommentService } from "./comment.service"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { CreateCommentDto } from "./dto/create-comment.dto"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { Comment } from "src/entities/comment.entity"
import { AuthGuard } from "src/auth/auth.guard"

@ApiTags("comment")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: "create comment" })
  @ApiResponse({
    status: 201,
    description: "comment created",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto)
  }

  @Get()
  @ApiOperation({ summary: "get all comments" })
  @ApiResponse({
    status: 200,
    description: "get all comments",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }

  @Patch(":id")
  @ApiOperation({ summary: "edit comment" })
  @ApiResponse({
    status: 200,
    description: "comment updated",
  })
  @ApiResponse({
    status: 401,
    description: "unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "comment not found",
  })
  update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto)
  }
}
