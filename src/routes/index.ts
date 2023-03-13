import cors from 'cors'
import express, { Router } from 'express'
import path from 'path'

import { authRoutes } from './auth.routes'
import { uploadsRoutes } from './uploads.routes'
import { usersRoutes } from './users.routes'

export const router = Router()

router.use(cors())

router.use('/auth', authRoutes)
router.use('/uploads', uploadsRoutes)
router.use('/users', usersRoutes)
router.use('/files', express.static(path.resolve('tmp', 'uploads')))
