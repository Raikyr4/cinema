import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { IngressoEntity } from './entities/ingresso.entity';

@Injectable()
export class IngressosService {
  constructor(private prisma: PrismaService) {}

  async create(createIngressoDto: CreateIngressoDto): Promise<IngressoEntity> {
    return this.prisma.ingresso.create({
      data: {
        ...createIngressoDto,
        dataVenda: new Date(),
      },
    });
  }

  async findAll(): Promise<IngressoEntity[]> {
    return this.prisma.ingresso.findMany({
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<IngressoEntity> {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
    if (!ingresso) {
      throw new Error(`Ingresso with id ${id} not found`);
    }
    return ingresso;
  }

  async update(id: string, updateIngressoDto: UpdateIngressoDto): Promise<IngressoEntity> {
    return this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
    });
  }

  async remove(id: string): Promise<IngressoEntity> {
    return this.prisma.ingresso.delete({
      where: { id },
    });
  }
}