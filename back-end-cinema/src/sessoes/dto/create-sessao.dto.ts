import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSessaoDto {
  @IsString()
  @IsNotEmpty()
  filmeId: string;

  @IsString()
  @IsNotEmpty()
  salaId: string;

  @IsDateString()
  @IsNotEmpty()
  dataHora: Date;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsString()
  @IsNotEmpty()
  idioma: string;

  @IsString()
  @IsNotEmpty()
  formato: string;
}