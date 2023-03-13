import { UnauthorizedError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { MeUseCase } from './MeUseCase'

let usersRepository: InMemoryUsersRepository
let sut: MeUseCase

describe('Me Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new MeUseCase(usersRepository)
  })

  it('should be able to return user data', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { userData } = await sut.execute({ userId: createdUser.id })

    expect(userData?.name).toEqual('John Doe')
  })

  it('should NOT show passwordHash field when show user data', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const user = await sut.execute({ userId: createdUser.id })

    expect(user).not.toHaveProperty('passwordHash')
  })

  it('should NOT be able to get user data with inexistent id', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    expect(async () => {
      await sut.execute({ userId: 'inexistent-id' })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
