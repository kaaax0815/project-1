import { config } from 'dotenv-safe';
// Loading Environment Variables
config();
import connectLivereload from 'connect-livereload';
import Express from 'express';
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

app.use('/local', (req, res) => res.sendFile(join(__dirname, '../static/local.html')));

app.use('/peer', (req, res) => res.sendFile(join(__dirname, '../static/peer.html')));

app.use('/', (req, res) => res.sendFile(join(__dirname, '../static/index.html')));

app.use('/css', Express.static(join(__dirname, '../static/css')));
app.use('/js', Express.static(join(__dirname, '../static/js')));

app.use('/api', apiRoutes);

app.listen(port, () => console.info(`[EXPRESS] Listing on Port ${port}`));
