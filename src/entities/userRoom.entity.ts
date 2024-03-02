import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm"

import { User } from "./user.entity"

@Entity()
export class UserRoom {
  @PrimaryColumn()
  userSendId: number

  @PrimaryColumn()
  userReceiveId: number

  @Column({ type: "varchar", length: 100 })
  name: string

  @Column({ default: false })
  accepted: boolean

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userSendId" })
  userSend: User

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userReceiveId" })
  userReceive: User
}
