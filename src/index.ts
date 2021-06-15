import { config } from 'dotenv-safe';
// Loading Environment Variables
config();
import connectLivereload from 'connect-livereload';
import Express, { static as Static } from 'express';
import livereload from 'livereload';
import { join } from 'path';

import apiRoutes from './routes/api';
import console from './utils/logger';

const app = Express();
const port = process.env.PORT || '8080';

// Livereload
if (process.env.LIVERELOAD == 'true') {
  const server = livereload.createServer();
  server.watch(join(__dirname + '../static'));
  app.use(connectLivereload());
}

// Custom Logger Middleware
app.use((req, res, next) => {
  if (res.headersSent) {
    console.info(`${req.ip} - ${req.method}, ${req.url}, ${res.statusCode}`);
  } else {
    res.on('finish', () => {
      console.info(`${req.method} ${req.url} ${res.statusCode}`);
    });
  }
  next();
});

app.use('/', Static(join(__dirname, '../static')));

app.use('/api', apiRoutes);

app.listen(port, () => console.info(`[EXPRESS] Listing on Port ${port}`));
