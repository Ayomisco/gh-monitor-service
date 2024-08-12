// src/services/pollingService.ts
import { fetchCommits } from './commitService';
import dataSource from '../../config/dataSource';
import dotenv from 'dotenv';

dotenv.config();

async function startPolling(): Promise<void> {
  try {
    const repositoryRepo = dataSource.getRepository('Repository');
    const repositories = await repositoryRepo.find();

    for (const repo of repositories) {
      await fetchCommits(repo);
    }

    setTimeout(startPolling, Number(process.env.POLLING_INTERVAL));
  } catch (error) {
    console.error(`Error in polling service: ${error.message}`);
  }
}

export default startPolling;
