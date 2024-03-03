import { Module } from "@nestjs/common"
import { FriendRequestController } from "./friend-request.controller"
import { UserModule } from "src/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FriendRequest } from "src/entities/friendRequest.entity"
import { FriendRequestService } from "./friend-request.service"

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest]), UserModule],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
})
export class FriendRequestModule {}
