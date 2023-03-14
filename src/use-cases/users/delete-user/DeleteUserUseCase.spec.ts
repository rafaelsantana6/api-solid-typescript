import { expect, describe, it, beforeEach } from 'vitest'
import { NotFoundError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const secondUser = await usersRepository.create({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    await sut.execute({ userId: secondUser.id })

    const users = await usersRepository.list()

    expect(users).toHaveLength(1)
    expect(users[0].email).toBe('johndoe@example.com')
  })

  it('should NOT be able to delete a user with inexistent id', async () => {
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
        userId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
