import { makeDeleteUserUseCase } from '@/use-cases/@factories/users/makeDeleteUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class DeleteUserController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const deleteUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteUserParamsSchema.parse(req.params)

    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({ userId: id })

    return reply.status(204).send()
  }
}

export { DeleteUserController }
