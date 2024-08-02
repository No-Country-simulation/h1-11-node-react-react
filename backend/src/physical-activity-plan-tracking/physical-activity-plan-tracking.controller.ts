import { Controller, Patch, Param, ParseIntPipe, Get } from "@nestjs/common";
import { PhysicalActivityPlanTrackingService } from "./physical-activity-plan-tracking.service";


@Controller('physical-activity-plan-tracking')
export class PhysicalActivityPlanTrackingController {
  constructor(private readonly physicalActivityPlanTrackingService: PhysicalActivityPlanTrackingService) {}

  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.physicalActivityPlanTrackingService.markPhysicalActivityPlanAsCompleted(id);
  }

  @Get('doctor/:doctorId')
  async getTrackingForDoctor(@Param('doctorId') doctorId: string) {
    return this.physicalActivityPlanTrackingService.getPhysicalActivityPlanTrackingForDoctor(doctorId);
  }
}
