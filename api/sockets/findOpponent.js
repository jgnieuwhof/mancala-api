
import _ from 'lodash'
import u from 'updeep'
import chalk from 'chalk'

import { generateId } from '../helpers/object'

export default ({ io, socket }) => {
  socket.on(`client::findOpponent`, async ({ settings, gems: startingGems }) => {
    try {
      let roomUpdate
      let state = global.state
      let user = state.users[socket.id]
      let roomId = Object.keys(state.rooms).find(roomId => {
        return !state.rooms[roomId].player2 && _.isEqual(state.rooms[roomId].settings, settings)
      })
      if (roomId) {
        roomUpdate = { player2: user.id }
      }
      else {
        roomId = generateId({ object: state.rooms })
        roomUpdate = { id: roomId, player1: user.id, settings, gems: startingGems }
      }
      state = u({
        users: { [user.id]: { room: roomId } },
        rooms: { [roomId]: roomUpdate },
      }, state)
      global.state = state
      socket.join(roomId)

      let { gems, player1, player2 } = state.rooms[roomId]
      if (player1 && player2) {
        io.to(roomId).emit(`server::matchMade`, { gems, player1 })
        console.log(chalk.green(`${player1} and ${player2} are now playing in room ${roomId}`))
        console.log(chalk.blue(JSON.stringify(global.state, null, 4)))
      }
      else {
        console.log(chalk.yellow(`${player1} is waiting in room ${roomId}`))
      }
    }
    catch (e) {
      console.log(chalk.red(`Error in client::findOpponent: ${e}`))
    }
  })
}
