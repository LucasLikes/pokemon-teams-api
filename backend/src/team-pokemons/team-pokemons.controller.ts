import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TeamPokemonsService } from './team-pokemons.service';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';

@Controller('teams/:teamId/pokemons')
export class TeamPokemonsController {
  constructor(private readonly teamPokemonsService: TeamPokemonsService) {}

  @Post()
  addPokemon(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() dto: CreateTeamPokemonDto,
  ) {
    return this.teamPokemonsService.addPokemon(teamId, dto);
  }

  @Get()
  listPokemons(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamPokemonsService.listPokemons(teamId);
  }

  @Delete(':pokemonId')
  removePokemon(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('pokemonId', ParseIntPipe) pokemonId: number,
  ) {
    return this.teamPokemonsService.removePokemon(teamId, pokemonId);
  }
}
