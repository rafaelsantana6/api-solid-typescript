import { NotFoundError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { User } from '@prisma/client'

interface IFindUserByEmailUseCaseRequest {
  email: string
}

interface IFindUserByEmailUseCaseResponse {
  user: Omit<User, 'passwordHash'>
}

export class FindUserByEmailUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
  }: IFindUserByEmailUseCaseRequest): Promise<IFindUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const { passwordHash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
    }
  }
}
