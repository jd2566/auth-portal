import { Context } from "koa";
import { User } from "../entities/User";
import { UserGateway } from "../gateways/UserGateway";
import { signToken } from "../config/jwt";

interface UserCredentialDto {
  username: string;
  password: string;
}

interface UserInfoDto {
  username: string;
  isActivate: boolean;
}

interface TokenDto {
  token: string;
}

export default class UsersController {

  public static async create (ctx: Context) {
    const { username, password }: UserCredentialDto = ctx.request.body
    const gateway = UserGateway.instance

    const userCheck = await gateway.findUser(username)
    if (userCheck !== null) {
      ctx.throw(400, 'Username exist.')
    }

    const user: User = await gateway.createUser(username, password)
    const response: UserInfoDto = {
      username: user.username,
      isActivate: user.isActive
    }
    ctx.status = 200;
    ctx.body = response;
  }

  public static async login (ctx: Context) {
    const { username, password }: UserCredentialDto = ctx.request.body
    const gateway = UserGateway.instance

    const user: User = await gateway.findUser(username)
    if (user === null) {
      ctx.throw(400, 'Username or password wrong')
    }

    const passwordValid: boolean = user.checkIfUnencryptedPasswordIsValid(password)

    if (passwordValid) {
      const payload: UserInfoDto = {
        username: user.username,
        isActivate: user.isActive
      }

      const response: TokenDto = {
        token: signToken(payload)
      }
      ctx.status = 200;
      ctx.body = response;
    } else {
      ctx.throw(400, 'Username or password wrong')
    }

  }

}
