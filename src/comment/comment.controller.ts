import { Controller, Get, Body, Patch, Param, Post } from "@nestjs/common"
import { CommentService } from "./comment.service"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { CreateCommentDto } from "./dto/create-comment.dto"

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  @Get()
  findAll() {
    return this.commentService.findAll()
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto)
  }
}
