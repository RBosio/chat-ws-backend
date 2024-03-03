import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Message } from "src/entities/message.entity"
import { Repository } from "typeorm"
import { CreateMessageDto } from "./dto/create-message.dto"
import { UpdateMessageDto } from "./dto/update-message.dto"
import { GroupService } from "src/group/group.service"
import { UserService } from "src/user/user.service"

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private groupService: GroupService,
    private userService: UserService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto)

    const groupFounded = await this.groupService.findOne(
      createMessageDto.groupId,
    )
    message.group = groupFounded

    const userFounded = await this.userService.findOne(
      createMessageDto.userSendId,
    )
    message.userSend = userFounded

    return this.messageRepository.save(message)
  }

  async findAllFromGroup(id: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        group: {
          id,
        },
      },
      relations: {
        userSend: true,
      },
    })
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    })

    if (!message) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }

    const messageUpdated = Object.assign(message, updateMessageDto)

    return this.messageRepository.save(messageUpdated)
  }
}
