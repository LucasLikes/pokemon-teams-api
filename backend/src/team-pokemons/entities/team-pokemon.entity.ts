import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'

@Entity('team_pokemons')
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.pokemons, { onDelete: 'CASCADE' })
  team: Team;

  @Column({ length: 100 })
  pokemonIdentifier: string;
}
