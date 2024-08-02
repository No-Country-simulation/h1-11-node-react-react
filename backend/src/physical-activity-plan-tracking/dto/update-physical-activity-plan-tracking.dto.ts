import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalActivityPlanTrackingDto } from './create-physical-activity-plan-tracking.dto';

export class UpdatePhysicalActivityPlanTrackingDto extends PartialType(CreatePhysicalActivityPlanTrackingDto) {}
