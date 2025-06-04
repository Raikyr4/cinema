import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;

  @IsDateString()
  @IsNotEmpty()
  dataEstreia: Date;
}