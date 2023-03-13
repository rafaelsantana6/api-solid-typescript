import { NotFoundError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { FindUserByEmailUseCase } from './FindUserByEmailUseCase'

let usersRepository: InMemoryUsersRepository
let sut: FindUserByEmailUseCase

describe('Find User by Email Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindUserByEmailUseCase(usersRepository)
  })

  it('should be able to find a user by email', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { user } = await sut.execute({ email: createdUser.email })

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

    const user = await sut.execute({ email: createdUser.email })

    expect(user).not.toHaveProperty('passwordHash')
  })

  it('should NOT be able to find user with inexistent email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    expect(async () => {
      await sut.execute({ email: 'inexistent-mail@example.com' })
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
