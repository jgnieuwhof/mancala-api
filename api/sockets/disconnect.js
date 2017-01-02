
import _ from 'lodash'
import chalk from 'chalk'

export default ({ socket }) => {
  socket.on(`disconnect`, () => {
    try {
      let state = global.state
      let userId = socket.id
      let roomId = state.users[userId].room
      global.state = {
        ...state,
        users: _.omitBy(state.users, (val, key) => key === userId),
        rooms: _.omitBy(state.rooms, (val, key) => key === roomId),
      }
      socket.leave(roomId)
      socket.broadcast.to(roomId).emit(`server::abandoned`)

      console.log(chalk.magenta(`Disconnected: `, JSON.stringify(global.state, null, 4)))
    }
    catch (e) {
      console.log(chalk.red(`Error in disconnect: ${e}`))
    }
  })
}
