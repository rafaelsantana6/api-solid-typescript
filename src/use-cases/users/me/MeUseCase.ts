import { UnauthorizedError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { User } from '@prisma/client'

interface MeUseCaseRequest {
  userId: string
}

interface MeUseCaseResponse {
  userData: Omit<User, 'passwordHash'>
}

export class MeUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: MeUseCaseRequest): Promise<MeUseCaseResponse> {
    const userData = await this.usersRepository.findById(userId)

    if (!userData) {
      throw new UnauthorizedError('User not found')
    }

    const { passwordHash, ...userWithoutPassword } = userData

    return {
      userData: userWithoutPassword,
    }
  }
}
