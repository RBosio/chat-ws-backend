import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateRoomDto } from "./dto/create-room.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRoom } from "src/entities/userRoom.entity"
import { Repository } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { UserService } from "src/user/user.service"

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(UserRoom)
    private userRoomRepository: Repository<UserRoom>,
    private readonly userService: UserService,
  ) {}

  async addFriend(createRoomDto: CreateRoomDto) {
    const request = this.userRoomRepository.create()
    const userR = await this.userService.findOne(createRoomDto.userReceiveId)
    const userS = await this.userService.findOne(createRoomDto.userSendId)

    request.name = uuidv4()
    request.userReceive = userR
    request.userSend = userS

    return this.userRoomRepository.save(request)
  }

  async findCommentsByRoom(id: number): Promise<UserRoom> {
    const room = await this.userRoomRepository.findOne({
      where: {
        id,
      },
      relations: {
        comments: true,
      },
    })

    if (!room) {
      throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
    }

    return room
  }

  async acceptFriend(id: number) {
    const requestFound = await this.userRoomRepository.findOne({
      where: {
        id,
      },
    })

    if (!requestFound) {
      throw new HttpException("Request not found", HttpStatus.NOT_FOUND)
    }

    requestFound.status = "accepted"

    return this.userRoomRepository.save(requestFound)
  }

  async cancel(id: number) {
    const requestFound = await this.userRoomRepository.findOne({
      where: {
        id,
      },
    })

    if (!requestFound) {
      throw new HttpException("Request not found", HttpStatus.NOT_FOUND)
    }

    requestFound.status = "rejected"

    return this.userRoomRepository.save(requestFound)
  }
}
