import { Test, TestingModule } from '@nestjs/testing';
import { TrainersService } from './trainers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TrainersService', () => {
  let service: TrainersService;
  let trainerRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    trainerRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation(async (trainer) => ({ id: 1, ...trainer })),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainersService,
        {
          provide: getRepositoryToken(Trainer),
          useValue: trainerRepository,
        },
      ],
    }).compile();

    service = module.get<TrainersService>(TrainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a trainer', async () => {
      const dto = { name: 'Ash', city: 'Pallet Town' };
      const expectedTrainer = { id: 1, ...dto };

      const result = await service.create(dto);

      expect(trainerRepository.create).toHaveBeenCalledWith(dto);
      expect(trainerRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedTrainer);
    });
  });

  describe('findOne', () => {
    it('should return a trainer when found', async () => {
      const trainer = { id: 1, name: 'Ash', city: 'Pallet Town' };
      trainerRepository.findOne.mockResolvedValue(trainer);

      const result = await service.findOne(1);

      expect(result).toEqual(trainer);
      expect(trainerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['teams'],
      });
    });

    it('should throw NotFoundException when trainer does not exist', async () => {
      trainerRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
