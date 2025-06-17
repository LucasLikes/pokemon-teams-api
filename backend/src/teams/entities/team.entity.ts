import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Trainer } from '../../trainers/entities/trainer.entity'
import { TeamPokemon } from '../../team-pokemons/entities/team-pokemon.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.teams, { onDelete: 'CASCADE' })
  trainer: Trainer;

  @OneToMany(() => TeamPokemon, (tp) => tp.team, { cascade: true })
  pokemons: TeamPokemon[];
}
