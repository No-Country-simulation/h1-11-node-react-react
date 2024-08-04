import { Module } from '@nestjs/common';
import { NutritionPlanTrackingService } from './nutrition-plan-tracking.service';
import { NutritionPlanTrackingController } from './nutrition-plan-tracking.controller';

@Module({
  controllers: [NutritionPlanTrackingController],
  providers: [NutritionPlanTrackingService],
})
export class NutritionPlanTrackingModule {}
