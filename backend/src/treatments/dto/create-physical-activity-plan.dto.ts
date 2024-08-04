import { IsString, IsInt, IsDateString, IsArray, ValidateNested, IsEnum, MinLength, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ActivityFrequency, ActivityIntensity } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class PhysicalActivityExerciseDto {
  @IsString()
  name: string;
}

export class CreatePhysicalActivityPlanDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsDateString()
  endDate: string;

  @ApiProperty({enum: ActivityFrequency, enumName: "ActivityFrequency"})
  @IsEnum(ActivityFrequency, {message: 'frequency must be either "--" or "--"'})
  @MinLength(1)
  frequency: ActivityFrequency;

  @ApiProperty({ enum: ActivityIntensity, enumName: "ActivityIntensity" })
  @IsEnum(ActivityIntensity, { message: 'intensity must be either "--" or "--"' })
  intensity: ActivityIntensity;

  @IsUUID()
  treatmentId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhysicalActivityExerciseDto)
  exercises: PhysicalActivityExerciseDto[];
}
