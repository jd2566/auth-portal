//import { TestHelper } from '../testHelper';
import { KoaServer } from "../../server";
import request from 'supertest';

const server = new KoaServer()
const app = server.app

//beforeAll(async () => {
//  await TestHelper.instance.setupTestDB();
//});

//afterAll(async () => {
//  await TestHelper.instance.teardownTestDB();
//});

describe('User Controller Tests', () => {
  test('should create a user', async () => {
    const response =
      await request(app.callback())
        .post('/users')
        .send({ username: 'testuser', password: '123456' })
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      username: 'testuser',
      isActive: true
    });
  });

});
