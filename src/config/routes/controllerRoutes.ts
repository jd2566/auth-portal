import Router from "koa-router";
import * as controller from "../../controller";

const controllerRouter = new Router();

controllerRouter.get("/", controller.users.index);

export { controllerRouter };
