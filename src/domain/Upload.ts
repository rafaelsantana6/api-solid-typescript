import { env } from '@/env'
import { v4 as uuidV4 } from 'uuid'

export interface IUpload {
  id?: string
  name: string
  size: number
  module: string
  key: string
  url?: string
  creationDate?: Date
}

export class Upload {
  id?: string
  name: string
  size: number
  module: string
  key: string
  url?: string
  creationDate?: Date

  constructor(properties: IUpload) {
    this.id = uuidV4()
    this.name = properties.name
    this.size = properties.size
    this.module = properties.module
    this.key = properties.key
    this.url =
      properties.url || `${env.API_URL}:${env.API_PORT}/files/${this.key}`
    this.creationDate = properties.creationDate || new Date()
  }
}
