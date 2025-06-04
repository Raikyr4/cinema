import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { SalaEntity } from './entities/sala.entity';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto): Promise<SalaEntity> {
    return this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  async findAll(): Promise<SalaEntity[]> {
    return this.prisma.sala.findMany();
  }

  async findOne(id: string): Promise<SalaEntity> {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
    });
    if (!sala) {
      throw new Error(`Sala with id ${id} not found`);
    }
    return sala;
  }

  async update(id: string, updateSalaDto: UpdateSalaDto): Promise<SalaEntity> {
    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  async remove(id: string): Promise<SalaEntity> {
    return this.prisma.sala.delete({
      where: { id },
    });
  }
}