import { AppDataSource } from "./data-source"
import { KoaServer } from "./server";
import { logger } from "./services/logger"

AppDataSource.initialize().then(async () => {

    const app = new KoaServer()
    app.start()

}).catch(error => logger.error(error))
