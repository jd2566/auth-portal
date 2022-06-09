import * as jsonwebtoken from 'jsonwebtoken';
import sanitizedConfig from './env'

export function signToken (userInfo) {
  return jsonwebtoken.sign({
    data: userInfo,
    exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
  }, sanitizedConfig.JWT_SECRET)
}
