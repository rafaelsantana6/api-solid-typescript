import { ok } from '@/presentation/helpers/http-helper'
import { CreateUserUseCase } from '@/use-cases/users/create-user/CreateUserUseCase'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: CreateUserController.Request): Promise<HttpResponse> {
    const requestBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      phone: z.string().nullable(),
      userPhoto: z.string().nullable(),
      isActive: z.boolean().default(true),
      sapCode: z.array(z.string()),
    })

    const { name, email, password, phone, userPhoto, isActive, sapCode } =
      requestBodySchema.parse(request)

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
      phone,
      userPhoto,
      isActive,
      sapCode,
    })

    return ok(user)
  }
}

export namespace CreateUserController {
  export type Request = {
    name: string
    email: string
    password: string
    phone?: string
    userPhoto?: string
    isActive?: Boolean
    role: Role
    sapCode: string[]
  }
}
