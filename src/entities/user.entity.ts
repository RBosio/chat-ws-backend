import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import { UserRoom } from "./userRoom.entity"

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

  @OneToMany(() => UserRoom, (userRoom) => userRoom.userSend)
  roomS: UserRoom[]

  @OneToMany(() => UserRoom, (userRoom) => userRoom.userReceive)
  roomR: UserRoom[]

  rooms: UserRoom[]
}
