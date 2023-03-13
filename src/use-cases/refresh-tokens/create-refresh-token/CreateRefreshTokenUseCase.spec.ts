import { BadRequestError, UnauthorizedError } from '@/errors/ApiErrors'
import { InMemoryRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/InMemoryRefreshTokensRepository'
import { InMemoryUsersRepository } from '@/repositories/users/implementations/InMemoryUsersRepository'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { compare, hash } from 'bcryptjs'
import { CreateRefreshTokenUseCase } from './CreateRefreshTokenUseCase'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let usersRepository: IUsersRepository
let sut: CreateRefreshTokenUseCase

describe('Create Refresh Token Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateRefreshTokenUseCase(
      refreshTokensRepository,
      usersRepository
    )
  })

  it('should be able to create a refresh token', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { refreshToken } = await sut.execute({ userId: user.id })

    expect(refreshToken).toHaveProperty('id')
    expect(refreshToken).toHaveProperty('expiresIn')
  })

  it('should NOT be able to create a refresh token to inexistent user id', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    expect(async () => {
      await sut.execute({
        userId: 'inexistent-user-id',
      })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
