
import { randomToken } from './token'

export const generateId = ({ object }) => {
  let token = randomToken()
  while(token in object) {
    token = randomToken()
  }
  return token
}
