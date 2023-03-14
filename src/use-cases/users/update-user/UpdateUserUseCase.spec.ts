import { expect, describe, it, beforeEach } from 'vitest'
import { NotFoundError } from '@/errors/ApiErrors'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { UpdateUserUseCase } from './UpdateUserUseCase'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update a user data', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const updatedUser = await sut.execute({
      userId: createdUser.id,
      data: {
        email: 'johndoe_update@example.com',
      },
    })

    expect(updatedUser.user.email).toEqual('johndoe_update@example.com')
  })

  it('should NOT show passwordHash field on return data', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const updatedUser = await sut.execute({
      userId: createdUser.id,
      data: {
        email: 'johndoe_update@example.com',
      },
    })

    expect(updatedUser).not.toHaveProperty('passwordHash')
  })

  it('should NOT be able to update a user with inexistent id', async () => {
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
        data: {
          email: 'johndoe_update@example.com',
        },
      })
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
