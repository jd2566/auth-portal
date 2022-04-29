import { UserGateway } from "../../gateways/UserGateway";
import { TestHelper } from '../testHelper';

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
});

afterAll(async () => {
  await TestHelper.instance.teardownTestDB();
});

describe('User Gateway Tests', () => {
  test('should create a user', async () => {
    const user = await UserGateway.instance.createUser('testuser1', 'testpassword')
    expect(user.username).toBe('testuser1');
  });

  //test('should return the user', async () => {
  //  const user = await UserGateway.instance.findUser('testuser', 'testpassword');
  //  expect(user.isActive).toBe(true);
  //});
});
