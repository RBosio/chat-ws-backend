import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AddFriendDto } from "./dto/add-friend.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { UserService } from "src/user/user.service"
import { FriendRequest } from "src/entities/friendRequest.entity"

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    private readonly userService: UserService,
  ) {}

  async addFriend(createRoomDto: AddFriendDto): Promise<FriendRequest> {
    const request = this.friendRequestRepository.create()
    const userR = await this.userService.findOne(createRoomDto.userReceiveId)
    const userS = await this.userService.findOne(createRoomDto.userSendId)

    request.userReceive = userR
    request.userSend = userS

    return this.friendRequestRepository.save(request)
  }

  /* async findCommentsByGroup(id: number): Promise<FriendRequest> {
    const friend = await this.friendRequestRepository.findOne({
      where: {
        id,
      },
      relations: {
        comments: true,
      },
    })

    if (!friend) {
      throw new HttpException("Friend request not found", HttpStatus.NOT_FOUND)
    }

    return friend
  } */

  async getFriendRequests(id: number): Promise<FriendRequest[]> {
    const requestsFound = await this.friendRequestRepository.find({
      where: [
        {
          userSend: {
            id,
          },
        },
        {
          userReceive: {
            id,
          },
        },
      ],
    })

    const requests = requestsFound.filter((r) => r.status === "waiting")
    return requests
  }

  async acceptFriend(id: number): Promise<FriendRequest> {
    const requestFound = await this.friendRequestRepository.findOne({
      where: {
        id,
      },
    })

    if (!requestFound) {
      throw new HttpException("Request not found", HttpStatus.NOT_FOUND)
    }

    requestFound.status = "accepted"

    return this.friendRequestRepository.save(requestFound)
  }

  async rejectFriend(id: number): Promise<FriendRequest> {
    const requestFound = await this.friendRequestRepository.findOne({
      where: {
        id,
      },
    })

    if (!requestFound) {
      throw new HttpException("Request not found", HttpStatus.NOT_FOUND)
    }

    requestFound.status = "rejected"

    return this.friendRequestRepository.save(requestFound)
  }
}
