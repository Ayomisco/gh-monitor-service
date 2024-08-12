import { Commit } from '../entities/Commit';
import { Repository } from '../entities/Repository';
import githubClient from '../../config/githubClient';
import dataSource from '../../config/dataSource';

export async function fetchCommits(repo: Repository, since?: Date): Promise<void> {
  try {
    const url = since ? `/repos/${repo.name}/commits?since=${since.toISOString()}` : `/repos/${repo.name}/commits`;
    const { data } = await githubClient.get(url);
    const commitRepo = dataSource.getRepository(Commit);

    for (const commitData of data) {
      const existingCommit = await commitRepo.findOneBy({ url: commitData.html_url });
      if (!existingCommit) {
        const commit = new Commit();
        commit.message = commitData.commit.message;
        commit.author = commitData.commit.author.name;
        commit.date = new Date(commitData.commit.author.date);
        commit.url = commitData.html_url;
        commit.repository = repo;

        await commitRepo.save(commit);
      }
    }
  } catch (error) {
    console.error(`Error fetching commits: ${error.message}`);
    throw new Error(`Failed to fetch commits: ${error.message}`);
  }
}
