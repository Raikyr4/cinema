import { Ingresso } from '@prisma/client';

export class IngressoEntity implements Ingresso {
  id: string;
  sessaoId: string;
  nomeCliente: string;
  cpf: string;
  assento: string;
  pagamento: string;
  dataVenda: Date;
  preco: number;
}