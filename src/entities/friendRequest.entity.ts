import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { User } from "./user.entity"

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: "waiting" })
  status: string

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userSendId" })
  userSend: User

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userReceiveId" })
  userReceive: User
}
