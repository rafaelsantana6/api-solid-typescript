import { Prisma, User } from '@prisma/client'
import { v4 as uuidV4 } from 'uuid'

export interface IUserFilter {
  isActive?: boolean
}

export class UserData {
  id?: string
  name: string
  email: string
  passwordHash: string
  phone: string
  userPhoto?: string
  isActive?: boolean
  creationDate?: Date

  constructor(properties: Prisma.UserCreateInput) {
    this.id = uuidV4()
    this.name = properties.name
    this.email = properties.email
    this.passwordHash = properties.passwordHash
    this.phone = properties.phone
    this.userPhoto = properties.userPhoto || null
    this.isActive = properties.isActive === false ? false : true
    this.creationDate = new Date()
  }
}
