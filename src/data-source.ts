import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entities/Users"
import { config } from 'dotenv';

interface SourceOptions {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
export class DataBaseSource {
    public instance: DataSource;

    constructor(options: SourceOptions) {
        this.instance = new DataSource({
            type: "postgres",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: true,
            logging: false,
            entities: [Users],
            migrations: [],
            subscribers: []
        })
    }
}

config()

export const AppDataSource = new DataBaseSource({
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})
