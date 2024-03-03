import { Module } from "@nestjs/common"
import { FriendRequestController } from "./friend-request.controller"
import { UserModule } from "src/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FriendRequest } from "src/entities/friendRequest.entity"
import { FriendRequestService } from "./friend-request.service"
import { GroupModule } from "src/group/group.module"

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest]), UserModule, GroupModule],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
})
export class FriendRequestModule {}
