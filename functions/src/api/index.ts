import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getCommunities } from './handlers/communities/list';

const app = express();

app.use(cors());

app.get('/api/communities', getCommunities);

export const api = functions.https.onRequest(app);
