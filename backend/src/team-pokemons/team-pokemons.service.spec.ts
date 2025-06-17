import { Test, TestingModule } from '@nestjs/testing';
import { TeamPokemonsService } from './team-pokemons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../teams/entities/team.entity';
import { Repository } from 'typeorm';
import { PokeApiService } from '../pokeapi/pokeapi.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TeamPokemonsService', () => {
  let service: TeamPokemonsService;
  let teamPokemonRepository: jest.Mocked<Repository<TeamPokemon>>;
  let teamRepository: jest.Mocked<Repository<Team>>;
  let pokeApiService: jest.Mocked<PokeApiService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamPokemonsService,
        {
          provide: getRepositoryToken(TeamPokemon),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Team),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: PokeApiService,
          useValue: {
            validatePokemon: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamPokemonsService>(TeamPokemonsService);
    teamPokemonRepository = module.get(getRepositoryToken(TeamPokemon));
    teamRepository = module.get(getRepositoryToken(Team));
    pokeApiService = module.get(PokeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPokemon', () => {
    const teamId = 1;
    const dto = { pokemonIdentifier: 'pikachu' };

    it('should throw NotFoundException if team does not exist', async () => {
      teamRepository.findOne.mockResolvedValue(null);

      await expect(service.addPokemon(teamId, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if team already has 6 pokemons', async () => {
      teamRepository.findOne.mockResolvedValue({
        id: teamId,
        pokemons: [{}, {}, {}, {}, {}, {}], // Simula 6 pokemons
      } as any);

      await expect(service.addPokemon(teamId, dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if Pokémon is invalid in PokéAPI', async () => {
      teamRepository.findOne.mockResolvedValue({
        id: teamId,
        pokemons: [],
      } as any);

      pokeApiService.validatePokemon.mockRejectedValue(
        new BadRequestException('Pokémon inválido'),
      );

      await expect(service.addPokemon(teamId, dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should add pokemon successfully if all validations pass', async () => {
      teamRepository.findOne.mockResolvedValue({
        id: teamId,
        pokemons: [],
      } as any);

      pokeApiService.validatePokemon.mockResolvedValue({
        name: 'Pikachu',
        types: ['Electric'],
        sprite: 'sprite-url',
      });

      teamPokemonRepository.create.mockReturnValue({
        id: 1,
        team: { id: teamId },
        pokemonIdentifier: dto.pokemonIdentifier,
      } as any);

      teamPokemonRepository.save.mockResolvedValue({
        id: 1,
        team: { id: teamId },
        pokemonIdentifier: dto.pokemonIdentifier,
      } as any);

      const result = await service.addPokemon(teamId, dto);

      expect(result).toBeDefined();
      expect(teamPokemonRepository.create).toHaveBeenCalled();
      expect(teamPokemonRepository.save).toHaveBeenCalled();
    });
  });
});
