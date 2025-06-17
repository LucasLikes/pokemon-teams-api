import { ApiProperty } from '@nestjs/swagger';

export class TeamPokemonResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID interno da entrada do Pokémon no time.',
  })
  id: number;

  @ApiProperty({
    example: 'pikachu',
    description: 'Identificador original usado para registrar o Pokémon (pode ser nome ou ID numérico).',
  })
  pokemonIdentifier: string;

  @ApiProperty({
    example: 'Pikachu',
    description: 'Nome oficial do Pokémon, obtido da PokéAPI.',
  })
  name: string;

  @ApiProperty({
    type: [String],
    example: ['Electric'],
    description: 'Tipos do Pokémon, conforme a PokéAPI.',
  })
  types: string[];

  @ApiProperty({
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    description: 'URL do sprite oficial do Pokémon.',
  })
  sprite: string;
}
