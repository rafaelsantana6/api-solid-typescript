import { NotFoundError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { FindUserByIdUseCase } from './FindUserByIdUseCase'

let usersRepository: InMemoryUsersRepository
let sut: FindUserByIdUseCase

describe('Find User by ID Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindUserByIdUseCase(usersRepository)
  })

  it('should be able to find a user by id', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user?.name).toEqual('John Doe')
  })

  it('should NOT show passwordHash field when show user', async () => {
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

  it('should NOT be able to find user with inexistent id', async () => {
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
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
