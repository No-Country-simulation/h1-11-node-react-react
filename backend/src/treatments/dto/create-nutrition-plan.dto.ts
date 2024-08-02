import { IsString, IsInt, IsDateString, IsArray, ValidateNested, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class NutritionPlanMealDto {
  @IsString()
  name: string;
}

class NutritionPlanRestrictionDto {
  @IsString()
  name: string;
}

export class CreateNutritionPlanDto {

  @ApiProperty()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @IsInt()
  calories: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NutritionPlanMealDto)
  meals: NutritionPlanMealDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NutritionPlanRestrictionDto)
  restrictions: NutritionPlanRestrictionDto[];

  @ApiProperty()
  @IsUUID()
  treatmentId: string;
}
