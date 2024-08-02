import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NutritionPlanTrackingService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('NutritionPlanTrackingService');

  onModuleInit() {
    this.$connect();
    this.logger.log('NutritionPlanTracking Service connected to database')
  }

  async markNutritionPlanAsCompleted(nutritionPlanTrackingId: string) {
    return this.nutritionPlanTracking.update({
      where: { id: nutritionPlanTrackingId },
      data: { completed: true, date: new Date() },
    });
  }

  async getNutritionPlanTrackingForDoctor(doctorId: string) {
    return this.nutritionPlanTracking.findMany({
      where: { nutritionPlan: { treatment: { doctorId } } },
      include: { nutritionPlan: true, patient: true },
    });
  }
}
