import request from 'supertest';
import { KoaServer } from "../server";

const server = new KoaServer()
const app = server.app

test('Hello world works', async () => {
  const response = await request(app.callback()).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello!');
});
