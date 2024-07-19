import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsString, MinLength } from "class-validator";

export enum LaboratoryType {
  MEDICINA = 'MEDICINA',
  ANALISIS = 'ANALISIS'
}

export class CreateLaboratoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  contactName: string;

  @ApiProperty({ enum: LaboratoryType, enumName: "LaboratoryType" }) // Documenta el enum para Swagger
  @IsEnum(LaboratoryType, { message: 'State must be either "MEDICINA" or "ANÁLISIS"' })
  type: LaboratoryType;
}
