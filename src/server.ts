import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '127.0.0.1',
    port: env.API_PORT,
  })
  .then(() => {
    console.log(`✅ APP running on port ${env.API_PORT}`)
  })
