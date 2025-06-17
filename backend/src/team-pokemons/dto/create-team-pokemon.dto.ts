import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamPokemonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'pikachu',
    description: 'Identificador do Pokémon na PokéAPI. Pode ser o nome ou o ID numérico.',
  })
  pokemonIdentifier: string;
}
