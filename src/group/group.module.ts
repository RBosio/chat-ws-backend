import { Module } from "@nestjs/common"
import { GroupService } from "./group.service"
import { GroupController } from "./group.controller"
import { UserModule } from "src/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Group } from "src/entities/group.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
