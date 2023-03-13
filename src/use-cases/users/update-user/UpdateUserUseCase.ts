import { NotFoundError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { Prisma, User } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  userId: string
  data: Prisma.UserUpdateInput
}

interface UpdateUserUseCaseResponse {
  user: User
}

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const doesUserExists = await this.usersRepository.findById(userId)

    if (!doesUserExists) {
      throw new NotFoundError('User does not exists')
    }

    const user = await this.usersRepository.update(userId, data)

    // @ts-expect-error
    delete user['passwordHash']

    return {
      user,
    }
  }
}

export { UpdateUserUseCase }
