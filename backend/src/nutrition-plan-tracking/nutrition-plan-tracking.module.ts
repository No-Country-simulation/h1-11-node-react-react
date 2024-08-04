import { Module } from '@nestjs/common';
import { NutritionPlanTrackingService } from './nutrition-plan-tracking.service';
import { NutritionPlanTrackingController } from './nutrition-plan-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NutritionPlanTrackingController],
  providers: [NutritionPlanTrackingService],
  imports: [AuthModule]
})
export class NutritionPlanTrackingModule {}
