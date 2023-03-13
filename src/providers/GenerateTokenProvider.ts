import { sign } from 'jsonwebtoken'

import { env } from '@/env'

interface IGenerateTokenInputData {
  payload?: {}
  userId: string
}

class GenerateTokenProvider {
  async execute({ payload = {}, userId }: IGenerateTokenInputData) {
    const token = sign(payload, env.AUTH_SECRET, {
      subject: userId,
      expiresIn: env.ACCESS_TOKEN_EXP_TIME,
    })

    return token
  }
}

export { GenerateTokenProvider }
