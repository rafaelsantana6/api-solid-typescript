import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateUserUseCase } from '@/use-cases/@factories/users/makeCreateUserUseCase'

export class CreateUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      phone: z.string().nullable(),
      userPhoto: z.string().nullable(),
      isActive: z.boolean().default(true),
    })

    const { name, email, password, phone, userPhoto, isActive } =
      createUserBodySchema.parse(req.body)

    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      email,
      name,
      password,
      phone,
      userPhoto,
      isActive,
    })

    return res.status(201).send()
  }
}
