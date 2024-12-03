import { AppDataSource } from '../database/index'
import { User } from '../models/User'
import * as bcrypt from 'bcrypt'

AppDataSource.initialize()
  .then(async () => {
    const predefinedUsers = [
      {
        id: '1',
        username: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
      },
      {
        id: '2',
        username: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        password: 'senha456',
      },
      {
        id: '3',
        username: 'Carlos Souza',
        email: 'carlos.souza@example.com',
        password: 'senha789',
      },
      {
        id: '4',
        username: 'Ana Santos',
        email: 'ana.santos@example.com',
        password: 'senha101112',
      },
      {
        id: '5',
        username: 'Pedro Lima',
        email: 'pedro.lima@example.com',
        password: 'senha131415',
      },
    ]

    // Seed function
    const seedDatabase = async () => {
      try {
        const userRepository = AppDataSource.getRepository(User)

        // Check if data exists
        const existingUsers = await userRepository.count()

        if (existingUsers === 0) {
          console.log('Starting to seed users...')

          for (const userData of predefinedUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10)

            const user = userRepository.create({
              ...userData,
              passwordHash: hashedPassword,
            })

            await userRepository.save(user)
          }

          console.log('Seed completed successfully!')
        } else {
          console.log('Database already has data, skipping seed')
        }
      } catch (error) {
        console.error('Seed failed:', error)
        throw error
      }
    }

    // Execute seed
    await seedDatabase()
      .then(() => {
        console.log('Seed process finished')
        process.exit(0)
      })
      .catch((error) => {
        console.error('Seed process failed:', error)
        process.exit(1)
      })
  })
  .catch((error) =>
    console.log('Error during Data Source initialization:', error)
  )
