import { Module } from '@nestjs/common';
import { PhysicalActivityPlanTrackingService } from './physical-activity-plan-tracking.service';
import { PhysicalActivityPlanTrackingController } from './physical-activity-plan-tracking.controller';

@Module({
  controllers: [PhysicalActivityPlanTrackingController],
  providers: [PhysicalActivityPlanTrackingService],
})
export class PhysicalActivityPlanTrackingModule {}
