import { FastifyInstance } from 'fastify'

export default (fastify: FastifyInstance, opts: any, done: Function) => {
  fastify.post('/createChat', async (request, reply) => {
    const chat = await fastify.prisma.chat.create({
      data: {
        title: 'hello w',
        type: 'public',
        chatUsers: {
          create: [
            {
              userId: request.user.id,
              // chatGuid String @db.Uuid
              // lastViewedMessageId: 'a',
              // lastViewedAt: 'a',
            }
          ],
          //ChatUser[]
        },
      },
      include: { chatUsers: true },
    })
    return chat
  })
  fastify.delete('/deleteChat', async (request, reply) => {
    const chat = await fastify.prisma.chat.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        guid: '0888f341-0640-45bb-bb65-2b9ef9da2173',
        deletedAt: null,
      },
    })
    return chat
  })
  fastify.get('/getChats', async (request, reply) => {
    const chats = await fastify.prisma.chat.findMany({
      where: {
        deletedAt: null,
        chatUsers: {
          some: {
            userId: request.user.id
          }
        }
      },
      // include: { author: true },
    })
    return chats
  })
  fastify.get('/getChatInfo', async (request, reply) => {
    return 1
  })
  done()
}
