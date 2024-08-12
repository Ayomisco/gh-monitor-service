// src/controllers/githubController.ts
import { Request, Response } from 'express';
import { fetchRepositoryDetails } from '../services/repositoryService';
import { getTopCommitAuthors } from '../services/queryService';

export async function getRepositoryDetails(req: Request, res: Response): Promise<void> {
  try {
    const { repoName } = req.params;
    const repository = await fetchRepositoryDetails(repoName);
    res.json(repository);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTopCommitAuthorsHandler(req: Request, res: Response): Promise<void> {
  try {
    const { repoName } = req.params;
    const { limit } = req.query;
    const topAuthors = await getTopCommitAuthors(repoName, Number(limit) || 10);
    res.json(topAuthors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
