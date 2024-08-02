import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MedicationTrackingService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('MedicationTrackingService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MedicationTracking Service connected to database')
  }

  async markMedicationAsCompleted(medicationTrackingId: string) {
    return this.medicationTracking.update({
      where: { id: medicationTrackingId },
      data: { completed: true, date: new Date() },
    });
  }

  async getMedicationTrackingForDoctor(doctorId: string) {
    return this.medicationTracking.findMany({
      where: { medication: { treatment: { doctorId } } },
      include: { medication: true, patient: true },
    });
  }
}
