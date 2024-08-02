import { Controller, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { NutritionPlanTrackingService } from './nutrition-plan-tracking.service';

@Controller('nutrition-plan-tracking')
export class NutritionPlanTrackingController {
  constructor(private readonly nutritionPlanTrackingService: NutritionPlanTrackingService) {}

  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.nutritionPlanTrackingService.markNutritionPlanAsCompleted(id);
  }

  @Get('doctor/:doctorId')
  async getTrackingForDoctor(@Param('doctorId') doctorId: string) {
    return this.nutritionPlanTrackingService.getNutritionPlanTrackingForDoctor(doctorId);
  }
}
