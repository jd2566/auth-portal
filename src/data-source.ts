import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entities/User"
import config from "./config/env";

export enum Env {
    Test = 0,
    Prod = 1
}

export function getDataSource (targetEnv: Env): DataSource {
    const commonOptions: DataSourceOptions = {
        type: "postgres",
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
    }
    let envOptions = {
        host: config.TYPEORM_HOST,
        port: config.TYPEORM_PORT,
        username: config.TYPEORM_USERNAME,
        password: config.TYPEORM_PASSWORD,
        database: config.TYPEORM_DATABASE
    }

    if (targetEnv === Env.Test) {
        envOptions = {
            host: config.TESTING_HOST,
            port: config.TESTING_PORT,
            username: config.TESTING_USERNAME,
            password: config.TESTING_PASSWORD,
            database: config.TESTING_DATABASE
        }
    }

    return new DataSource({ ...commonOptions, ...envOptions })
}
