import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { PokeApiService } from '../pokeapi/pokeapi.service';
import { TeamPokemonResponseDto } from './dto/team-pokemon-response.dto';

@Injectable()
export class TeamPokemonsService {
  constructor(
    @InjectRepository(TeamPokemon)
    private readonly teamPokemonRepository: Repository<TeamPokemon>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    private readonly pokeApiService: PokeApiService,
  ) {}

  async addPokemon(
    teamId: number,
    dto: CreateTeamPokemonDto,
  ): Promise<TeamPokemon> {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['pokemons'],
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado.`);
    }

    // Limite máximo de 6 Pokemon por time
    if (team.pokemons.length >= 6) {
      throw new BadRequestException(
        'Limite de 6 Pokémon por time excedido.',
      );
    }
    
    // Validação na PokéAPI (verifica se existe Pokemon)
    await this.pokeApiService.validatePokemon(dto.pokemonIdentifier);

    const teamPokemon = this.teamPokemonRepository.create({
      team,
      pokemonIdentifier: dto.pokemonIdentifier,
    });

    return this.teamPokemonRepository.save(teamPokemon);
  }

  async listPokemons(teamId: number): Promise<TeamPokemonResponseDto[]> {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['pokemons'],
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado.`);
    }

    const enrichedPokemons = await Promise.all(
      team.pokemons.map((tp) => this.enrichPokemonData(tp)),
    );

    return enrichedPokemons;
  }

  async removePokemon(teamId: number, pokemonId: number): Promise<void> {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['pokemons'],
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado.`);
    }

    const teamPokemon = team.pokemons.find((p) => p.id === pokemonId);
    if (!teamPokemon) {
      throw new NotFoundException(
        `Pokémon com ID ${pokemonId} não encontrado no time.`,
      );
    }

    await this.teamPokemonRepository.delete(pokemonId);
  }

  private async enrichPokemonData(
    teamPokemon: TeamPokemon,
  ): Promise<TeamPokemonResponseDto> {
    const data = await this.pokeApiService.validatePokemon(
      teamPokemon.pokemonIdentifier,
    );

    return {
      id: teamPokemon.id,
      pokemonIdentifier: teamPokemon.pokemonIdentifier,
      name: data.name,
      types: data.types,
      sprite: data.sprite,
    };
  }
}
