import { ok } from '@/presentation/helpers/http-helper'
import { UpdateUserUseCase } from '@/use-cases/users/update-user/UpdateUserUseCase'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class UpdateUserController implements Controller {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: UpdateUserController.Request): Promise<HttpResponse> {
    const updateUserBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      phone: z.string().nullable().optional(),
      userPhoto: z.string().nullable().optional(),
      isActive: z.boolean().optional(),
      sapCode: z.array(z.string()).optional(),
    })

    const updateUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { name, email, password, phone, userPhoto, isActive, sapCode } =
      updateUserBodySchema.parse(request)

    const { id } = updateUserParamsSchema.parse(request)

    const updatedUser = await this.updateUserUseCase.execute({
      userId: id,
      data: {
        name,
        email,
        passwordHash: password,
        phone,
        userPhoto,
        isActive,
        sapCode,
      },
    })

    return ok(updatedUser)
  }
}

export namespace UpdateUserController {
  export type Request = {
    id: string
    name?: string
    email?: string
    password?: string
    phone?: string
    userPhoto?: string
    isActive?: Boolean
    role?: Role
    sapCode?: string[]
  }
}
