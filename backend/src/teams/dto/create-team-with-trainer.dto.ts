import { CreateTeamDto } from './create-team.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateTeamWithTrainerDto extends CreateTeamDto {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'ID do treinador ao qual o time será vinculado.',
  })
  trainerId: number;
}
