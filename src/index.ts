// src/index.ts
import express from 'express';
import dataSource from '../config/dataSource';
import startPolling from './services/pollingService';
import { errorHandler } from './utils/errorHandler';
import { getRepositoryDetails, getTopCommitAuthorsHandler } from './controllers/githubController';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/repo/:repoName', getRepositoryDetails);
app.get('/repo/:repoName/top-authors', getTopCommitAuthorsHandler);

app.use(errorHandler);

dataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startPolling();
    });
  })
  .catch((error) => console.error('Database initialization failed', error));
