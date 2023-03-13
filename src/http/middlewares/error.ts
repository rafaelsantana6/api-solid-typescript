/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { ApiError } from '@/errors/ApiErrors'
import { env } from '@/env'

const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).json({
    message: `Internal server error - ${error.message}`,
  })
}

export { errorMiddleware }
