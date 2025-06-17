import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemonsService } from './team-pokemons.service';
import { TeamPokemonsController } from './team-pokemons.controller';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../teams/entities/team.entity';
import { PokeApiModule } from '../pokeapi/pokeapi.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team]), PokeApiModule],
  controllers: [TeamPokemonsController],
  providers: [TeamPokemonsService],
})
export class TeamPokemonsModule {}
