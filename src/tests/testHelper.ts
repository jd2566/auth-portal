import { DataSource } from 'typeorm';
import { Env, getDataSource } from '../data-source'

export class TestHelper {

  private static _instance: TestHelper;

  private constructor() { }

  public static get instance (): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private datasource!: DataSource;

  async setupTestDB () {
    this.datasource = getDataSource(Env.Test)
    await this.datasource.initialize()
  }

  async teardownTestDB () {
    await this.datasource.dropDatabase()
    await this.datasource.destroy()
  }

}
