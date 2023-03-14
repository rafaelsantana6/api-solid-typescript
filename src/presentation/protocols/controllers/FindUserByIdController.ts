import { ok } from '@/presentation/helpers/http-helper'
import { FindUserByIdUseCase } from '@/use-cases/users/find-user-by-id/FindUserByIdUseCase'
import { z } from 'zod'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class FindUserByIdController implements Controller {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  async handle(request: FindUserByIdController.Request): Promise<HttpResponse> {
    const requestParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = requestParamsSchema.parse(request)

    const user = await this.findUserByIdUseCase.execute({ userId: id })

    return ok(user)
  }
}

export namespace FindUserByIdController {
  export type Request = {
    userId: string
  }
}
