import fastify from 'fastify'
import { FastifyRequest } from 'fastify'
import prismaPlugin from './plugins/prisma'
import routes from './routes/index'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const server = fastify()
const init = async () => {
  // server.addHook('onRoute', async (...asd) => {
  //   console.log(asd)
  // })

  await server.register(prismaPlugin)
  routes(server)
  server.get('/ping', (request, reply) => {
    return 'pong\n'
  })
  server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
init()
