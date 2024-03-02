import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"

import { Room } from "./room.entity"

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
  image: string

  @ManyToMany(() => Room, (rooms) => rooms.users)
  rooms: Room[]
}
