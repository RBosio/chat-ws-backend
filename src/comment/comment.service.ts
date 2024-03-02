import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Comment } from "src/entities/comment.entity"
import { Repository } from "typeorm"

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto)

    return this.commentRepository.save(comment)
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
    })

    if (!comment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND)
    }

    const commentUpdated = Object.assign(comment, updateCommentDto)

    return this.commentRepository.save(commentUpdated)
  }
}
