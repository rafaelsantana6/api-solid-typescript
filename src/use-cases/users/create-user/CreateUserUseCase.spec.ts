import { expect, describe, it, beforeEach } from 'vitest'
import { BadRequestError } from '@/errors/ApiErrors'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/implementations/InMemoryUsersRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('createdAt')
  })

  it('should hash user password in creation', async () => {
    const createUser = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    const user = await usersRepository.findById(createUser.user.id)

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user?.passwordHash ?? ''
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should NOT be able to create a new user with a existant email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: null,
      userPhoto: null,
      isActive: true,
    })

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: null,
        userPhoto: null,
        isActive: true,
      })
    }).rejects.toBeInstanceOf(BadRequestError)
  })
})
