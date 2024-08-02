import { Controller, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { MedicationTrackingService } from './medication-tracking.service';

@Controller('medication-tracking')
export class MedicationTrackingController {
  constructor(private readonly medicationTrackingService: MedicationTrackingService) {}

  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.medicationTrackingService.markMedicationAsCompleted(id);
  }

  @Get('doctor/:doctorId')
  async getTrackingForDoctor(@Param('doctorId') doctorId: string) {
    return this.medicationTrackingService.getMedicationTrackingForDoctor(doctorId);
  }
}
