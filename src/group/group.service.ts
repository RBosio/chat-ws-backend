import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateGroupDto } from "./dto/create-group.dto"
import { UpdateGroupDto } from "./dto/update-group.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Group } from "src/entities/group.entity"
import { Repository } from "typeorm"
import { UserService } from "src/user/user.service"
import { User } from "src/entities/user.entity"

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private userService: UserService,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto)

    return this.groupRepository.save(group)
  }

  async addUser(groupId: number, user: User): Promise<Group> {
    const groupFounded = await this.findOne(groupId)
    const userFounded = await this.userService.findOne(user.id)

    groupFounded.users.push(userFounded)

    return this.groupRepository.save(groupFounded)
  }

  async findOne(id: number): Promise<Group> {
    const groupFounded = await this.groupRepository.findOne({
      where: {
        id,
        status: true,
      },
      relations: {
        messages: true,
        users: true,
      },
    })

    if (!groupFounded) {
      throw new HttpException("Group not found", HttpStatus.NOT_FOUND)
    }

    return groupFounded
  }

  async findOneByName(name: string): Promise<Group> {
    const groupFounded = await this.groupRepository.findOne({
      where: {
        name,
        status: true,
      },
      relations: {
        messages: {
          userSend: true,
        },
        users: true,
      },
    })

    if (!groupFounded) {
      throw new HttpException("Group not found", HttpStatus.NOT_FOUND)
    }

    return groupFounded
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const groupFounded = await this.findOne(id)

    const groupUpdated = Object.assign(groupFounded, updateGroupDto)

    return this.groupRepository.save(groupUpdated)
  }

  async remove(id: number): Promise<Group> {
    const groupFounded = await this.findOne(id)

    groupFounded.status = false

    return this.groupRepository.save(groupFounded)
  }
}
