import Koa from 'koa';
import { controllerRouter } from './config/routes/controllerRoutes';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import { logger } from './services/logger';
import { config } from 'dotenv';
export class KoaServer {
  app: Koa;

  constructor() {
    config()
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
    logger.info(`Server started, port: ${PORT}`)
    this.app.listen(PORT);
  }
}
