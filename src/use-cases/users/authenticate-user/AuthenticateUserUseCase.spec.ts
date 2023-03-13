import { UnauthorizedError } from '@/errors/ApiErrors'
import { InMemoryRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/InMemoryRefreshTokensRepository'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepository: InMemoryUsersRepository
let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new AuthenticateUserUseCase(usersRepository, refreshTokensRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const auth = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(auth).toHaveProperty('token')
    expect(auth).toHaveProperty('refreshToken')
  })

  it('should NOT show password field in user field', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const auth = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(auth.user).not.toHaveProperty('passwordHash')
  })

  it('should NOT be able to authenticate user with wrong email', async () => {
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
        email: 'wrong-email@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should NOT be able to authenticate user with wrong password', async () => {
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
        email: 'johndoe@example.com',
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
