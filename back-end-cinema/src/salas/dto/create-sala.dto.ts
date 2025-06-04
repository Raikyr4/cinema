import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @IsNotEmpty()
  capacidade: number;
}