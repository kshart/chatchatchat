import { FastifyInstance } from 'fastify'

export default (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get('/createChat', async (request, reply) => {
    return []
  })
  fastify.get('/deleteChat', async (request, reply) => {
    return 1
  })
  fastify.get('/getChats', async (request, reply) => {
    return 1
  })
  fastify.get('/getChatInfo', async (request, reply) => {
    return 1
  })
  done()
}
