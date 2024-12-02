// models/user.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

// Add this at the top
import 'reflect-metadata'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  passwordHash: string
}
