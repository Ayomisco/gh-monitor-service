
import { DataSource } from 'typeorm';
import { Repository } from '../src/entities/Repository';
import { Commit } from '../src/entities/Commit';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL?.split('://')[1] || './database.sqlite',
  entities: [Repository, Commit],
  synchronize: true,  // Automatically create database schema
});

export default dataSource;


