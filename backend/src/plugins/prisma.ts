import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}


const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
  await prisma.$connect()
  server.decorate('prisma', prisma)
  server.addHook('onClose', async (server: FastifyInstance) => {
    await server.prisma.$disconnect()
  })
})

export default prismaPlugin
