import { Server } from 'socket.io'
import type { Socket } from 'socket.io'

const io = new Server({
  // transports: ['websocket'],
  cors: {
    origin: '*',
  }
})

const usersMap = new Map<number, Set<Socket>>()
io.on('connection', (socket: Socket) => {
  const userId = 123
  const userMap = usersMap.get(userId) || new Set<Socket>()
  userMap.add(socket)
  usersMap.set(userId, userMap)
  console.log(socket.handshake.headers)
  console.log(`Socket ${socket.id} connected with transport ${socket.conn.transport.name}`)
  socket.conn.on('upgrade', (transport) => {
    console.log(`transport upgraded to ${transport.name}`)
  })
  socket.on('disconnect', (reason) => {
    userMap.delete(socket)
    console.log(`disconnected due to ${reason}`)
  })
  socket.on('same', (reason) => {
    console.log(`same ${reason}`)
    console.log(usersMap)
  })
})
io.listen(Number(process.env.PORT || 3000))
