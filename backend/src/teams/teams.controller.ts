import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  // Criar time para um treinador
  @Post('trainers/:trainerId/teams')
  create(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamsService.create({ ...createTeamDto, trainerId });
  }

  // Listar times de um treinador
  @Get('trainers/:trainerId/teams')
  findAllByTrainer(@Param('trainerId', ParseIntPipe) trainerId: number) {
    return this.teamsService.findAllByTrainer(trainerId);
  }

  // Buscar um time pelo id
  @Get('teams/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  // Atualizar um time
  @Put('teams/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  // Deletar um time
  @Delete('teams/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.remove(id);
  }
}
