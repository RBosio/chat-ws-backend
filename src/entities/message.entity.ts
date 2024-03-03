import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @Column()
  userSendId: number

  @Column()
  userReceiveId: number
}
