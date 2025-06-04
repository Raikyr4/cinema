import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { SessaoEntity } from './entities/sessao.entity';

@Injectable()
export class SessoesService {
  constructor(private prisma: PrismaService) {}

  async create(createSessaoDto: CreateSessaoDto): Promise<SessaoEntity> {
    return this.prisma.sessao.create({
      data: {
        ...createSessaoDto,
        dataHora: new Date(createSessaoDto.dataHora) 
      }
    });
  }

  async findAll(): Promise<SessaoEntity[]> {
    return this.prisma.sessao.findMany({
      include: {
        filme: true,
        sala: true,
      },
    });
  }

  async findOne(id: string): Promise<SessaoEntity> {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: {
        filme: true,
        sala: true,
      },
    });
    if (!sessao) {
      throw new Error(`Sessao with id ${id} not found`);
    }
    return sessao;
  }

  async update(id: string, updateSessaoDto: UpdateSessaoDto): Promise<SessaoEntity> {
    return this.prisma.sessao.update({
      where: { id },
      data: updateSessaoDto,
    });
  }

  async remove(id: string): Promise<SessaoEntity> {
    return this.prisma.sessao.delete({
      where: { id },
    });
  }
}