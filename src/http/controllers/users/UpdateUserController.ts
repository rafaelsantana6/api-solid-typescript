import { z } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/@factories/users/makeUpdateUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UpdateUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
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
      updateUserBodySchema.parse(req.body)

    const { id } = updateUserParamsSchema.parse(req.params)

    const updateUserUseCase = makeUpdateUserUseCase()

    const updatedUser = await updateUserUseCase.execute({
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

    return res.status(200).send(updatedUser)
  }
}
