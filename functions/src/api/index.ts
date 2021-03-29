import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello, API!');
});

export const api = functions.https.onRequest(app);
