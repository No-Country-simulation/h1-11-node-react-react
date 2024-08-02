import { Module } from '@nestjs/common';
import { MedicationTrackingService } from './medication-tracking.service';
import { MedicationTrackingController } from './medication-tracking.controller';

@Module({
  controllers: [MedicationTrackingController],
  providers: [MedicationTrackingService],
})
export class MedicationTrackingModule {}
