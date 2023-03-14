import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'

export const auth = (authFunction: AuthProps) => {
  return {
    onRequest: authFunction,
  }
}

type AuthProps = Array<() => void>
