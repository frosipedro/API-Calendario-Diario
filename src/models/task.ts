// models/task.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ nullable: true })
  description!: string

  @Column({ default: false })
  status!: boolean

  @Column()
  dateBegin!: Date

  @Column()
  dateEnd!: Date

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User
}