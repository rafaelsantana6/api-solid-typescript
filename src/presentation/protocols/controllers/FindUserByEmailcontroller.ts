import { ok } from '@/presentation/helpers/http-helper'
import { FindUserByEmailUseCase } from '@/use-cases/users/find-user-by-email/FindUserByEmailUseCase'
import { z } from 'zod'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class FindUserByEmailController implements Controller {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  async handle(
    request: FindUserByEmailController.Request
  ): Promise<HttpResponse> {
    const requestParamsSchema = z.object({
      email: z.string(),
    })

    const { email } = requestParamsSchema.parse(request)

    const user = await this.findUserByEmailUseCase.execute({ email })

    return ok(user)
  }
}

export namespace FindUserByEmailController {
  export type Request = {
    email: string
  }
}
