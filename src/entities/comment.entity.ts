import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
