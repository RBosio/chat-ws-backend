import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity"
import { Repository } from "typeorm"
import { hash } from "bcryptjs"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFounded = await this.findOneByEmail(createUserDto.email)
    if (userFounded) {
      throw new HttpException("email is duplicated!", HttpStatus.CONFLICT)
    }

    const user = this.userRepository.create(createUserDto)

    user.password = await hash(user.password, 10)

    return this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    return user
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    })

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    const userUpdated = Object.assign(user, updateUserDto)

    return this.userRepository.save(userUpdated)
  }

  async uploadFile(id: number, url: string): Promise<string> {
    const userFound = await this.findOne(id)

    userFound.url = url

    await this.userRepository.save(userFound)
    return "image uploaded!"
  }
}
