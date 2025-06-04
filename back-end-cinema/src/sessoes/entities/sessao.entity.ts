import { Sessao } from '@prisma/client';

export class SessaoEntity implements Sessao {
  id: string;
  filmeId: string;
  salaId: string;
  dataHora: Date;
  preco: number;
  idioma: string;
  formato: string;
  createdAt: Date;
}