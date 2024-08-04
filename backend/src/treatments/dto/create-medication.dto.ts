import { IsEnum, IsInt, IsString, IsUUID, MinLength } from "class-validator";
import { MedicationFrequency } from './medication-frequency.enum';
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicationDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  medicine: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  dosage: string;

  @ApiProperty({ enum: MedicationFrequency, enumName: "MedicationFrequency" }) // Documenta el enum para Swagger
  @IsEnum(MedicationFrequency, { message: 'frequency must be either "--" or "--"' })
  frequency: MedicationFrequency;

  @ApiProperty()
  @IsInt()
  days: number;

  @ApiProperty()
  @IsUUID()
  treatmentId: string;
}
