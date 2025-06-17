import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  city: string;

  @OneToMany(() => Team, (team) => team.trainer, { cascade: true })
  teams: Team[];
}
