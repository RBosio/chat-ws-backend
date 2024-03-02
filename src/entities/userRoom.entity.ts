import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { User } from "./user.entity"
import { Comment } from "./comment.entity"

@Entity()
export class UserRoom {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 100 })
  name: string

  @Column({ default: "waiting" })
  status: string

  @OneToMany(() => Comment, (comment) => comment.userRoom)
  comments: Comment[]

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userSendId" })
  userSend: User

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userReceiveId" })
  userReceive: User
}
