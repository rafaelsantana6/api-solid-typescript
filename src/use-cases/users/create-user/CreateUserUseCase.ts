import bcrypt from 'bcryptjs'

import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { BadRequestError } from '@/errors/ApiErrors'
import { User } from '@prisma/client'

interface ICreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string | null
  userPhoto: string | null
  sapCode: string[]
  isActive: boolean
}

interface ICreateUserUseCaseResponse {
  user: Omit<User, 'passwordHash'>
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    userPhoto,
    isActive,
    sapCode,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new BadRequestError('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: hashedPassword,
      phone,
      userPhoto,
      isActive,
      sapCode,
    })

    const { passwordHash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
    }
  }
}
