import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIngressoDto {
  @IsString()
  @IsNotEmpty()
  sessaoId: string;

  @IsString()
  @IsNotEmpty()
  nomeCliente: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  assento: string;

  @IsString()
  @IsNotEmpty()
  pagamento: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;
}