import { FastifyInstance, FastifyRequest } from 'fastify'
import chats from './chats'
import users from './users'

export interface AuthUser {
  id: number
  name: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthUser
  }
}

export default (fastify: FastifyInstance) => {
  fastify.addHook('preParsing', async (request: FastifyRequest) => {
    request.user = {
      id: 42,
      name: 'Jane Doe',
    }
  })
  fastify.register(users, { prefix: '/users' })
  fastify.register(chats, { prefix: '/chats' })
}
