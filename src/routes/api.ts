import { Router } from 'express';

const api = Router();

api.get('/', (req, res) => {
  res.json({ status: 'OK' });
});
api.get('/:lol', (req, res) => {
  const id = req.params.lol;
  res.json({ query: id });
});

export default api;
