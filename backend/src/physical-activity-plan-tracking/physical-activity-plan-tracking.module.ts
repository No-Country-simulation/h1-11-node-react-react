import { Module } from '@nestjs/common';
import { PhysicalActivityPlanTrackingService } from './physical-activity-plan-tracking.service';
import { PhysicalActivityPlanTrackingController } from './physical-activity-plan-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PhysicalActivityPlanTrackingController],
  providers: [PhysicalActivityPlanTrackingService],
  imports: [AuthModule]
})
export class PhysicalActivityPlanTrackingModule {}
