
import _ from 'lodash'
import u from 'updeep'
import chalk from 'chalk'

export default ({ socket }) => {
  socket.on(`client::abandonGame`, () => {
    try {
      let state = global.state
      let userId = socket.id
      let roomId = state.users[userId].room
      let room = state.rooms[roomId]
      let opponentId = room.player1 === userId ? room.player2 : room.player1
      let userUpdate = { [userId]: { room: null } }
      if (opponentId)
        userUpdate[opponentId] = { room: null }
      global.state = { ...state,
        users: u(userUpdate, state.users),
        rooms: _.omitBy(state.rooms, (val, key) => key === roomId),
      }
      socket.leave(roomId)
      socket.broadcast.to(roomId).emit(`server::abandoned`)

      console.log(chalk.magenta(`${userId} abandoned the game`))
    }
    catch (e) {
      console.log(chalk.red(`Error in client::abandonGame: ${e}`))
    }
  })
}
