import { Context } from "koa";
import { UserGateway } from "../gateways/UserGateway";

export default class UsersController {

  public static async create (ctx: Context) {
    const { username, password } = ctx.request.body
    const gateway = UserGateway.instance

    const userCheck = await gateway.findUser(username)
    if (userCheck !== null) {
      ctx.throw(400, 'Username exist.')
    }

    const user = await gateway.createUser(username, password)

    ctx.status = 200;
    ctx.body = {
      username: user.username,
      isActivate: user.isActive
    };
  }

}
