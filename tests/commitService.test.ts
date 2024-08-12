import { fetchCommits } from '../src/services/commitService';
import dataSource from '../config/dataSource';
import { Repository } from '../src/entities/Repository';
import { Commit } from '../src/entities/Commit';

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

test('fetchCommits should fetch and save commits', async () => {
  const repo = new Repository();
  repo.name = 'test-repo';
  repo.description = 'Test repository';
  repo.url = 'https://github.com/test/test-repo';
  repo.language = 'TypeScript';
  repo.forksCount = 0;
  repo.starsCount = 0;
  repo.openIssuesCount = 0;
  repo.watchersCount = 0;
  repo.createdAt = new Date();
  repo.updatedAt = new Date();
  await dataSource.getRepository(Repository).save(repo);

  await fetchCommits(repo);

  const commits = await dataSource.getRepository(Commit).find({ where: { repository: repo } });
  expect(commits).not.toHaveLength(0);
});
