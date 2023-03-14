import { UnauthorizedError, ApiError } from '@/errors/ApiErrors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const unauthorized = (message: string): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(message),
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ApiError(error.message),
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})
