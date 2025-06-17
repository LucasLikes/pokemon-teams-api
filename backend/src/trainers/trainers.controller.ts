import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  findAll() {
    return this.trainersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trainersService.findOne(id);
  }

@Post()
create(@Body() dto: CreateTrainerDto) {
  return this.trainersService.create(dto);
}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainersService.remove(id);
  }
}
