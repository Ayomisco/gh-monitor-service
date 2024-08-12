import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  },
});

export default githubClient;
