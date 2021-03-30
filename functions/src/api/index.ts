import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getCommunities } from './handlers/communities/list';
import { getSongBooks } from './handlers/songBooks/list';

const app = express();

app.use(cors());

app.get('/api/communities', getCommunities);
app.get('/api/songbooks', getSongBooks);

export const api = functions.https.onRequest(app);
