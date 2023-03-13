import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { IUsersRepository } from '../IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async list() {
    const users = await prisma.user.findMany()

    return users
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
