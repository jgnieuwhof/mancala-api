
import chalk from 'chalk'

export default ({ socket }) => {
  socket.on(`client::makeMove`, async ({ start }) => {
    try {
      let { room } = global.state.users[socket.id]
      socket.broadcast.to(room).emit(`server::makeMove`, { start })
      console.log(chalk.green(
        `Move made by ${socket.id} at position <${start}> in room <${room}>!`
      ))
    }
    catch (e) {
      console.log(chalk.red(`Error in client::makeMove: ${e}`))
    }
  })
}
