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

    return await user.save();
  }

  async findUser (username: string, password: string): Promise<User> {
    const user = await User.findOneOrFail({
      where: {
        username,
        password
      }
    });

    return user;
  }
}
