import express from 'express';

import {
  locationRouter,
} from './routes/location.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Taxi Backend is running 🚖');
});

app.use('/api/location', locationRouter);

app.listen(port, () => {
  console.log(
    `🚀 Server running on http://localhost:${port}`,
  );
});