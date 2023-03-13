import { NotFoundError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { User } from '@prisma/client'

interface FindUserByIdUseCaseRequest {
  userId: string
}

interface FindUserByIdUseCaseResponse {
  user: Omit<User, 'passwordHash'>
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const { passwordHash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
    }
  }
}
