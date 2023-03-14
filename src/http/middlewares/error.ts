import { ZodError } from 'zod'

import { env } from '@/env'
import { ApiError } from '@/errors/ApiErrors'
import { FastifyReply, FastifyRequest } from 'fastify'

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ApiError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: `Internal server error - ${error.message}`,
  })
}
