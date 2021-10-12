import Koa from 'koa';
import { controllerRouter } from './config/routes/controllerRoutes';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';

export class KoaServer {
  app: Koa;

  constructor() {
    this.app = new Koa()

    this.app.use(helmet())
      .use(bodyParser())
      .use(controllerRouter.routes())
      .use(controllerRouter.allowedMethods())
  }

  /**
   * start
   * Start listen for the incoming requests.
   */
  public start () {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT);
  }
}
