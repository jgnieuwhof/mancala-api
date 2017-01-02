
import u from 'updeep'
import chalk from 'chalk'

import socketEndpoints from './sockets'

// God object for managing connection state
global.state = {
  users: {},
  rooms: {},
}

export default async ({ io }) => {
  io.on(`connection`, async (socket) => {
    try {
      global.state = u({
        users: { [socket.id]: { id: socket.id, room: null } },
      }, global.state)
      console.log(chalk.yellow(`${socket.id} connected!`))
    }
    catch (e) {
      console.log(chalk.red(`Error while adding a user connection: ${e}`))
    }

    socketEndpoints.forEach(socketEndpoint => {
      socketEndpoint({ io, socket })
    })
  })
}
