import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { DataBaseSource } from '../data-source'

export class TestHelper {

  private static _instance: TestHelper;

  private constructor() { }

  public static get instance (): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private datasource!: DataSource;

  async setupTestDB () {
    config()
    const TestDataSource: DataBaseSource = new DataBaseSource({
      host: process.env.TESTING_HOST,
      port: Number(process.env.TESTING_PORT),
      username: process.env.TESTING_USERNAME,
      password: process.env.TESTING_PASSWORD,
      database: process.env.TESTING_DATABASE,
    })
    this.datasource = TestDataSource.instance
    await this.datasource.initialize()
  }

  async teardownTestDB () {
    await this.datasource.destroy()
  }

}
