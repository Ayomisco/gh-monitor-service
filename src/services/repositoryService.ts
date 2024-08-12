// src/services/repositoryService.ts
import { Repository } from '../entities/Repository';
import githubClient from '../../config/githubClient';
import dataSource from '../../config/dataSource';

export async function fetchRepositoryDetails(repoName: string): Promise<Repository> {
  try {
    const { data } = await githubClient.get(`/repos/${repoName}`);
    const repositoryRepo = dataSource.getRepository(Repository);

    let repository = await repositoryRepo.findOneBy({ name: repoName });
    if (!repository) {
      repository = new Repository();
    }

    repository.name = data.name;
    repository.description = data.description;
    repository.url = data.html_url;
    repository.language = data.language;
    repository.forksCount = data.forks_count;
    repository.starsCount = data.stargazers_count;
    repository.openIssuesCount = data.open_issues_count;
    repository.watchersCount = data.watchers_count;
    repository.createdAt = new Date(data.created_at);
    repository.updatedAt = new Date(data.updated_at);

    return repositoryRepo.save(repository);
  } catch (error) {
    console.error(`Error fetching repository details: ${error.message}`);
    throw new Error(`Failed to fetch repository details: ${error.message}`);
  }
}
