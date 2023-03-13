import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'

import { router } from './routes/index'
import { errorMiddleware } from './http/middlewares/error'

// ** Express
export const app = express()

// ** Middlewares
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

// ** Routes
app.use(router)

/* Error Middleware */ // ! IMPORTANT: need to be the last middleware on app
app.use(errorMiddleware)
