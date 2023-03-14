import path from 'node:path'

export const logger = {
  dev: {
    transport: {
      target: 'pino-pretty',
      level: 'info',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
  prisma: false,
}
