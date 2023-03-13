import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { IUsersRepository } from '../IUsersRepository'

class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      phone: data.phone ?? null,
      userPhoto: data.phone ?? null,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async list() {
    const users = this.users

    return users
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const users = this.users

    const index = this.users.findIndex((user) => user.id === id)

    for (const key in data) {
      // TODO: fix this
      //@ts-ignore
      users[index][key] = data[key]
    }

    return users[index]
  }

  async delete(id: string) {
    const users = this.users

    const index = this.users.findIndex((user) => user.id === id)

    users.splice(index, 1)
  }
}

export { InMemoryUsersRepository }
