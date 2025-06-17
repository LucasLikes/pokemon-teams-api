import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find({ relations: ['teams'] });
  }

  async findOne(id: number): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
      relations: ['teams'],
    });
    if (!trainer) {
      throw new NotFoundException(`Trainer with id ${id} not found`);
    }
    return trainer;
  }

  async create(trainer: Partial<Trainer>): Promise<Trainer> {
    const newTrainer = this.trainerRepository.create(trainer);
    return this.trainerRepository.save(newTrainer);
  }

  async remove(id: number): Promise<void> {
    await this.trainerRepository.delete(id);
  }
}
