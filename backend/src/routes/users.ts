import { FastifyInstance } from 'fastify'

export default (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get('/index', async (request, reply) => {
    const users = await fastify.prisma.user.findMany({
      // where: { published: true },
      // include: { author: true },
    })
    return users
  })
  fastify.get('/sync', async (request, reply) => {
    return request.user
  })
  done()
}
