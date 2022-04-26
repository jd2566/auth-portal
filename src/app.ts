import { AppDataSource } from "./data-source"
import { KoaServer } from "./server";
import { logger } from "./services/logger"

logger.info('Initializing Data Source...')

const datasource = AppDataSource.instance

datasource.initialize().then(async () => {
    logger.info('Initialization completed.')

    logger.info('Starting server...')
    const server = new KoaServer()
    server.start()
}).catch(error => logger.error(error))
