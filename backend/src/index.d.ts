import { PrismaClient } from '@prisma/client'

// interface AuthUser {
//   id: number
//   name: string
// }

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
  // interface FastifyRequest {
  //   user: AuthUser
  // }
}
