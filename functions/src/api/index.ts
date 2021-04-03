import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getCommunities } from './handlers/communities/list';
import { getSongBooks } from './handlers/songBooks/list';
import { getSongBook } from './handlers/songBooks/detail';
import { getSongBookSong } from './handlers/songBooks/song';

const app = express();

app.use(cors());

app.get('/api/communities', getCommunities);
app.get('/api/songbooks', getSongBooks);
app.get('/api/songbooks/:songBookId', getSongBook);
app.get('/api/songbooks/:songBookId/songs/:songId', getSongBookSong);

export const api = functions.https.onRequest(app);
