import bcrypt from 'bcrypt'
import db from '../database/index'

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
]

const seedUsers = async () => {
  try {
    db.get(
      'SELECT COUNT(*) as count FROM users',
      async (err, row: { count: number }) => {
        if (err) {
          console.error('Erro ao verificar usuários:', err.message)
          return
        }

        if (row.count === 0) {
          console.log('Inserindo usuários pré-definidos...')
          for (const user of predefinedUsers) {
            const passwordHash = await bcrypt.hash(user.password, 10)
            db.run(
              `INSERT INTO users (id, username, email, passwordHash) VALUES (?, ?, ?, ?)`,
              [user.id, user.username, user.email, passwordHash],
              (insertErr) => {
                if (insertErr) {
                  console.error('Erro ao inserir usuário:', insertErr.message)
                }
              }
            )
          }
          console.log('Usuários pré-definidos inseridos com sucesso!')
        } else {
          console.log('Usuários já existem no banco. Nenhum dado inserido.')
        }
      }
    )
  } catch (error) {
    console.error('Erro ao executar seed:', error)
  }
}

// Executa o seed
seedUsers()
