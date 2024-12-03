// models/user.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Task } from './Task'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  username!: string

  @Column({ unique: true })
  email!: string

  @Column()
  passwordHash!: string

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[]
}
