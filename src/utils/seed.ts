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
    ]
    const predefinedTasks = [
      {
        title: 'Tarefa do João',
        description: 'Primeira tarefa',
        date: new Date('2024-03-20'),
        status: false,
        user: { id: '1' },
      },
      {
        title: 'Relatório Mensal',
        description: '',
        date: new Date('2024-03-25'),
        status: false,
        user: { id: '2' },
      },
      {
        title: 'Reunião de Equipe',
        description: 'Agendar reunião semanal',
        date: new Date('2024-03-22'),
        status: true,
        user: { id: '2' },
      },
      {
        title: 'Apresentação',
        description: 'Preparar slides',
        date: new Date('2024-03-28'),
        status: false,
        user: { id: '2' },
      },
      {
        title: 'Review de Código',
        description: '',
        date: new Date('2024-03-21'),
        status: true,
        user: { id: '3' },
      },
      {
        title: 'Deploy',
        description: 'Fazer deploy da versão 2.0',
        date: new Date('2024-03-23'),
        status: false,
        user: { id: '3' },
      },
      {
        title: 'Backlog',
        description: 'Organizar backlog do próximo sprint',
        date: new Date('2024-03-24'),
        status: false,
        user: { id: '4' },
      },
      {
        title: 'Documentação',
        description: '',
        date: new Date('2024-03-26'),
        status: true,
        user: { id: '4' },
      },
      {
        title: 'Bug fixing',
        description: 'Corrigir bug #456',
        date: new Date('2024-03-27'),
        status: false,
        user: { id: '4' },
      },
      {
        title: 'Planning',
        description: 'Planejamento Q2',
        date: new Date('2024-03-29'),
        status: false,
        user: { id: '4' },
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

          const existingTasks = await AppDataSource.getRepository(
            'Task'
          ).count()

          if (existingTasks === 0) {
            console.log('Starting to seed tasks...')

            for (const taskData of predefinedTasks) {
              const task = await AppDataSource.getRepository('Task').create(
                taskData
              )
              await AppDataSource.getRepository('Task').save(task)
            }
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
