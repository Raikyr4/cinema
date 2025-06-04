import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmeEntity } from './entities/filme.entity';

@Injectable()
export class FilmesService {
  constructor(private prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    return this.prisma.filme.create({
      data: {
        ...createFilmeDto,
        dataEstreia: new Date(createFilmeDto.dataEstreia) 
      }
    });
  }

  async findAll(): Promise<FilmeEntity[]> {
    return this.prisma.filme.findMany();
  }

  async findOne(id: string): Promise<FilmeEntity> {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
    });
    if (!filme) {
      throw new Error(`Filme with id ${id} not found`);
    }
    return filme;
  }

  async update(id: string, updateFilmeDto: UpdateFilmeDto): Promise<FilmeEntity> {
    return this.prisma.filme.update({
      where: { id },
      data: updateFilmeDto,
    });
  }

  async remove(id: string): Promise<FilmeEntity> {
    return this.prisma.filme.delete({
      where: { id },
    });
  }
}