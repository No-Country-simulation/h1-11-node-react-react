import { PartialType } from '@nestjs/swagger';
import { CreateNutritionPlanTrackingDto } from './create-nutrition-plan-tracking.dto';

export class UpdateNutritionPlanTrackingDto extends PartialType(CreateNutritionPlanTrackingDto) {}
