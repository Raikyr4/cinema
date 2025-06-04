import { Sala } from '@prisma/client';

export class SalaEntity implements Sala {
  id: string;
  nome: string;
  tipo: string;
  capacidade: number;
  createdAt: Date;
}