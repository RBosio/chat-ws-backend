import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { FriendRequest } from "./friendRequest.entity"

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

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest)
  roomS: FriendRequest[]
}
