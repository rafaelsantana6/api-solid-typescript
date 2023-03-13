import { Request, Response } from 'express'
import { z } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/@factories/users/makeUpdateUserUseCase'

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateUserBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      phone: z.string().nullable().optional(),
      userPhoto: z.string().nullable().optional(),
      isActive: z.boolean().optional(),
    })

    const { name, email, password, phone, userPhoto, isActive } =
      updateUserBodySchema.parse(req.body)

    const { id } = req.params

    const updateUserUseCase = makeUpdateUserUseCase()

    const updatedUser = await updateUserUseCase.execute({
      data: {
        name,
        email,
        passwordHash: password,
        phone,
        userPhoto,
        isActive,
      },
      userId: id,
    })

    return res.status(200).json(updatedUser)
  }
}
