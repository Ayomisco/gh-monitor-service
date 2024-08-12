// src/entities/Repository.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Commit } from './Commit';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  language: string;

  @Column()
  forksCount: number;

  @Column()
  starsCount: number;

  @Column()
  openIssuesCount: number;

  @Column()
  watchersCount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Commit, (commit) => commit.repository)
  commits: Commit[];
}
