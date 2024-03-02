import { Module } from "@nestjs/common"
import { CommentService } from "./comment.service"
import { CommentController } from "./comment.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Comment } from "src/entities/comment.entity"
import { UserModule } from "src/user/user.module"

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
