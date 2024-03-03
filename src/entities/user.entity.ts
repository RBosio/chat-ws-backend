import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { FriendRequest } from "./friendRequest.entity"
import { Group } from "./group.entity"
import { Message } from "./message.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  surname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  url: string

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.userSend)
  friendS: FriendRequest[]

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.userReceive)
  friendR: FriendRequest[]

  @OneToMany(() => Message, (message) => message.userSend)
  messagesS: Message[]

  @OneToMany(() => Message, (message) => message.userReceive)
  messagesR: Message[]

  @ManyToMany(() => Group, (groups) => groups.users)
  @JoinTable()
  groups: Group[]
}
