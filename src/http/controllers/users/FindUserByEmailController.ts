import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindUserByEmailUseCase } from '@/use-cases/@factories/users/makeFindUserByEmailUseCase'

export class FindUserByEmailController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const findUserByEmailParamsSchema = z.object({
      email: z.string().email(),
    })

    const { email } = findUserByEmailParamsSchema.parse(req.params)

    const findUserByEmailUseCase = makeFindUserByEmailUseCase()

    const user = await findUserByEmailUseCase.execute({ email })

    return res.status(200).send(user)
  }
}
