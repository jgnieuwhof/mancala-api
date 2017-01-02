
import _ from 'lodash'
import u from 'updeep'
import chalk from 'chalk'

export default ({ socket }) => {
  socket.on(`client::finishGame`, () => {
    try {
      let state = global.state
      let userId = socket.id
      let roomId = state.users[userId].room
      let rooms = { ...state.rooms }
      if (rooms[roomId]) {
        rooms = _.omitBy(rooms, (val, key) => key === roomId)
      }
      global.state = { ...state,
        users: u({ [userId]: { room: null } }, state.users),
        rooms,
      }
      socket.leave(roomId)

      console.log(chalk.yellow(`${userId} finished and left`))
    }
    catch (e) {
      console.log(chalk.red(`Error in client::finishGame: ${e}`))
    }
  })
}
