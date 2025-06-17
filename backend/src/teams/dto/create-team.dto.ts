import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Time de Iniciais de Kanto',
    description: 'Nome do time de Pokémon.',
  })
  name: string;
}
