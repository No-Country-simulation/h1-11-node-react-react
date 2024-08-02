import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhysicalActivityPlanTrackingService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('PhysicalActivityPlanTrackingService');

  onModuleInit() {
    this.$connect();
    this.logger.log('PhysicalActivityPlanTracking Service connected to database')
  }

  async markPhysicalActivityPlanAsCompleted(physicalActivityPlanTrackingId: string) {
    return this.physicalActivityPlanTracking.update({
      where: { id: physicalActivityPlanTrackingId },
      data: { completed: true, date: new Date() },
    });
  }

  async getPhysicalActivityPlanTrackingForDoctor(doctorId: string) {
    return this.physicalActivityPlanTracking.findMany({
      where: { physicalActivityPlan: { treatment: { doctorId } } },
      include: { physicalActivityPlan: true, patient: true },
    });
  }
}
