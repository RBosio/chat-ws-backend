import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm"

import { User } from "./user.entity"

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 100 })
  name: string

  @ManyToMany(() => User, (users) => users.rooms)
  @JoinTable()
  users: User[]
}
