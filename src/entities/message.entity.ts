import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user.entity"
import { Group } from "./group.entity"

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @ManyToOne(() => Group, (group) => group.messages)
  group: Group

  @ManyToOne(() => User, (userS) => userS.messagesS)
  userSend: User

  @ManyToOne(() => User, (userR) => userR.messagesR)
  userReceive: User
}
