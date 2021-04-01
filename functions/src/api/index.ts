import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getCommunities } from './handlers/communities/list';
import { getSongBooks } from './handlers/songBooks/list';
import { getSongBook } from './handlers/songBooks/detail';

const app = express();

app.use(cors());

app.get('/api/communities', getCommunities);
app.get('/api/songbooks', getSongBooks);
app.get('/api/songbooks/:songBookId', getSongBook);

export const api = functions.https.onRequest(app);
