import { NotFoundError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { User } from '@prisma/client'

interface ListUsersUseCaseResponse {
  users: Omit<User, 'passwordHash'>[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list()

    if (!users || !users.length) {
      throw new NotFoundError('No users found')
    }

    const usersList = users.map((user) => {
      const { passwordHash, ...userWithoutPassword } = user

      return userWithoutPassword
    })

    return {
      users: usersList,
    }
  }
}
