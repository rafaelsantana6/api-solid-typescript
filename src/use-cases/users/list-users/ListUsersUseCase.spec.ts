import { expect, describe, it, beforeEach } from 'vitest'
import { NotFoundError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { ListUsersUseCase } from './ListUsersUseCase'

let usersRepository: InMemoryUsersRepository
let sut: ListUsersUseCase

describe('List Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUsersUseCase(usersRepository)
  })

  it('should be able to list users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    await usersRepository.create({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
  })

  it('should NOT show passwordHash field on returned users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    await usersRepository.create({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const { users } = await sut.execute()

    expect(users[0]).not.toHaveProperty('passwordHash')
    expect(users[1]).not.toHaveProperty('passwordHash')
  })

  it('should NOT be able to list users without no users registered', async () => {
    expect(async () => {
      await sut.execute()
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
