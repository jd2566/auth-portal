import http from 'http';
import Koa from 'koa';
import { usersRouter } from './config/routes/controllerRoutes';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import { logger } from './services/logger';

export class KoaServer {
  public app: Koa;
  server: http.Server;

  constructor() {
    this.app = new Koa()
    // Error handling
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {

        if (err.isJoi) {
          ctx.status = 400
        } else {
          ctx.status = err.statusCode || err.status || 500;
        }

        ctx.body = {
          message: err.message,
        };
      }
    })

    this.app
      .use(helmet())
      .use(bodyParser({ multipart: true }))
      .use(usersRouter.middleware())

    this.server = http.createServer(this.app.callback())
  }

  /**
   * start
   * Start listen for the incoming requests.
   */
  public start () {
    try {
      const PORT = process.env.PORT || 3000;
      this.server.listen(PORT);
      logger.info(`Server started, port: ${PORT}`)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * close
   */
  public close () {
    this.server.close()
  }
}
