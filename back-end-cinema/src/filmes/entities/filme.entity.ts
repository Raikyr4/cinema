import { Filme } from '@prisma/client';

export class FilmeEntity implements Filme {
  id: string;
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: Date;
  createdAt: Date;
}