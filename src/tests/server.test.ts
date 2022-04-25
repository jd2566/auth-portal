import { KoaServer } from "../server";

const server = new KoaServer()

test('Server works', async () => {

  const isServerUp = server.start()

  expect(isServerUp).toBe(true);
});

afterEach(() => {
  server.close()
});
