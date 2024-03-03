import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm"
import { User } from "./user.entity"
import { Message } from "./message.entity"

@Entity({ name: "group_" })
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: true })
  status: boolean

  @OneToMany(() => Message, (messages) => messages.group)
  messages: Message[]

  @ManyToMany(() => User, (user) => user.groups)
  users: User[]
}
