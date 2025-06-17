import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {
  @IsString()
  @ApiProperty({
    example: 'Ash Ketchum',
    description: 'Nome do treinador de Pokémon.',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Pallet Town',
    description: 'Cidade de origem do treinador (opcional).',
    required: false,
  })
  city?: string;
}
