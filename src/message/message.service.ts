import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Message } from "src/entities/message.entity"
import { Repository } from "typeorm"
import { CreateMessageDto } from "./dto/create-message.dto"
import { UpdateMessageDto } from "./dto/update-message.dto"

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto)

    return this.messageRepository.save(message)
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find()
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
