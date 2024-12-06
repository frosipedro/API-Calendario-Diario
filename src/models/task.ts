// models/task.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  datetime!: Date

  @Column({ nullable: true })
  description!: string

  @Column({ default: false })
  status!: boolean

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User
}
