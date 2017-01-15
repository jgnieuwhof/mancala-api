
import u from 'updeep'
import chalk from 'chalk'

export default ({ socket }) => {
  socket.on(`client::setUsername`, async ({ username }) => {
    if (!username || username.length < 6 || username.length > 20)
      console.log(chalk.red(`invalid username: ${username}`))

    try {
      global.state = u({
        users: {
          [socket.id] : { username },
        },
      }, global.state)
      console.log(JSON.stringify(global.state, null, 4))
      console.log(chalk.green(
        `${socket.id} just set their username to ${username}!`
      ))
    }
    catch (e) {
      console.log(chalk.red(`Error in client::setUsername: ${e}`))
    }
  })
}
