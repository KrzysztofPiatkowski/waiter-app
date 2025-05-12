import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'build/db/app.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'build'),
  noCors: true,
});

const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));
server.use(router);
server.listen(port);
