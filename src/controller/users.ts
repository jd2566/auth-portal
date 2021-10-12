import { Context } from "koa";

export default class UsersController {
  public static async index (ctx: Context) {
    ctx.status = 200;
    ctx.body = "Hello!";
  }
}
