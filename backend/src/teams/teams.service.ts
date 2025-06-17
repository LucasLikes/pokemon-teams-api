import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { Trainer } from '../trainers/entities/trainer.entity';
import { CreateTeamWithTrainerDto } from './dto/create-team-with-trainer.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) { }

  async create(dto: CreateTeamWithTrainerDto): Promise<Team> {
    const { trainerId, name } = dto;

    const trainer = await this.trainerRepository.findOne({ where: { id: trainerId } });
    if (!trainer) {
      throw new NotFoundException(`Trainer with id ${trainerId} not found`);
    }

    const team = this.teamRepository.create({ name, trainer });
    return this.teamRepository.save(team);
  }

  async findAllByTrainer(trainerId: number): Promise<Team[]> {
    return this.teamRepository.find({
      where: { trainer: { id: trainerId } },
      relations: ['pokemons'],
    });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['trainer', 'pokemons'],
    });
    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return team;
  }

  async update(id: number, updateData: Partial<Team>): Promise<Team> {
    const team = await this.findOne(id);
    Object.assign(team, updateData);
    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
