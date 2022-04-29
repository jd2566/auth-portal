import { User } from "../entities/User";

export class UserGateway {

  private static _instance: UserGateway;

  constructor() { }

  public static get instance (): UserGateway {
    if (!this._instance) this._instance = new UserGateway();

    return this._instance;
  }

  async createUser (username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username
    user.password = password
    user.hashPassword();
    try {
      return await user.save();
    } catch (error) {

    }
  }

  async findUser (username: string): Promise<User> {
    const user = await User.findOne({
      where: {
        username
      }
    });

    return user;
  }
}
