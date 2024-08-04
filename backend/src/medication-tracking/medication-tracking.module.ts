import { Module } from '@nestjs/common';
import { MedicationTrackingService } from './medication-tracking.service';
import { MedicationTrackingController } from './medication-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MedicationTrackingController],
  providers: [MedicationTrackingService],
  imports: [AuthModule]
})
export class MedicationTrackingModule {}
