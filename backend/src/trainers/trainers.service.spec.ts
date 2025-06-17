import { Test, TestingModule } from '@nestjs/testing';
import { TrainersService } from './trainers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TrainersService', () => {
  let service: TrainersService;
  let trainerRepository: jest.Mocked<Repository<Trainer>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainersService,
        {
          provide: getRepositoryToken(Trainer),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrainersService>(TrainersService);
    trainerRepository = module.get(getRepositoryToken(Trainer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a trainer', async () => {
      const dto = { name: 'Ash', city: 'Pallet Town' };
      const savedTrainer = { id: 1, ...dto };

      trainerRepository.save.mockResolvedValue(savedTrainer as Trainer);

      const result = await service.create(dto as any);
      expect(result).toEqual(savedTrainer);
      expect(trainerRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a trainer when found', async () => {
      const trainer = { id: 1, name: 'Ash', city: 'Pallet Town' } as Trainer;

      trainerRepository.findOne.mockResolvedValue(trainer);

      const result = await service.findOne(1);
      expect(result).toEqual(trainer);
      expect(trainerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when trainer does not exist', async () => {
      trainerRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
