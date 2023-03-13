import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import { app } from './app'
import { env } from './env'

const port = env.API_PORT

app.listen(port, () => console.log(`APP running on port ${port}`))
