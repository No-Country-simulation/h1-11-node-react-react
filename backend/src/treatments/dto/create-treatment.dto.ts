import { IsString, IsUUID, IsOptional, IsEnum, IsArray, MinLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePhysicalActivityPlanDto } from './create-physical-activity-plan.dto';
import { CreateMedicationDto } from './create-medication.dto';
import { CreateNutritionPlanDto } from './create-nutrition-plan.dto';

export class CreateTreatmentDto {
  @ApiProperty()
  @IsUUID()
  @MinLength(1)
  patientId: string;

  @ApiProperty()
  @IsUUID()
  @MinLength(1)
  doctorId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  medications?: CreateMedicationDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  physicalActivityPlans?: CreatePhysicalActivityPlanDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  nutritionPlans?: CreateNutritionPlanDto[];
}
