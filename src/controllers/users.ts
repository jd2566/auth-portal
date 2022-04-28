import { Context } from "koa";
import { UserGateway } from "../gateways/UserGateway";

export default class UsersController {
  public static async create (ctx: Context) {
    const { username } = ctx.request.body
    const user =
      await UserGateway.instance
        .createUser('testuser', 'testpassword')

    ctx.status = 200;
    ctx.body = "Hello!";
  }
}
