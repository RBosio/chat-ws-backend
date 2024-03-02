import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { UserRoom } from "./userRoom.entity"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @Column()
  userSendId: number

  @Column()
  userReceiveId: number

  @ManyToOne(() => UserRoom, (userR) => userR.comments)
  userRoom: UserRoom
}
