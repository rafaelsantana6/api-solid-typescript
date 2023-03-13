import { NotFoundError } from '@/errors/ApiErrors'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest) {
    const doesUserExists = await this.usersRepository.findById(userId)

    if (!doesUserExists) throw new NotFoundError('User does not exists')

    await this.usersRepository.delete(userId)
  }
}
