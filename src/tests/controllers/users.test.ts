//import { TestHelper } from '../testHelper';
import { KoaServer } from "../../server";
import request from 'supertest';

const server = new KoaServer()
const app = server.app

describe('User Controller Tests', () => {
  test('should create a user and return 200', async () => {
    const response =
      await request(app.callback())
        .post('/users')
        .send({ username: 'testuser', password: '123456' })
        .set('Accept', 'multipart/form-data')

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      username: 'testuser',
      isActive: true
    });
  });

  test('should throw 400 if request missing password data', async () => {
    const response =
      await request(app.callback())
        .post('/users')
        .send({ username: 'testuser' })
        .set('Accept', 'multipart/form-data')

    expect(response.status).toBe(400);
  });

});
