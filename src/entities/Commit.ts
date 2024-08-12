import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Repository } from './Repository';

@Entity()
export class Commit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  author: string;

  @Column()
  date: Date;

  @Column()
  url: string;

  @ManyToOne(() => Repository, (repository) => repository.commits)
  repository: Repository;
}
