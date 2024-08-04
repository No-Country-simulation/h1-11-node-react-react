import { Controller, Patch, Param, ParseIntPipe, Get } from "@nestjs/common";
import { PhysicalActivityPlanTrackingService } from "./physical-activity-plan-tracking.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators";
import { ValidRoles } from "src/auth/interfaces";

@ApiTags('PhysicalActivityPlanTracking')
@Controller('physical-activity-plan-tracking')
export class PhysicalActivityPlanTrackingController {
  constructor(private readonly physicalActivityPlanTrackingService: PhysicalActivityPlanTrackingService) {}

  @ApiOperation({
    summary: 'Marcar como completado el registro de Actividad física',
    description:
      'Los pacientes pueden marcar como completada una actividad física asignada.',
  })
  @ApiResponse({ status: 200, description: 'Actividad completada'})
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.PATIENT)
  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.physicalActivityPlanTrackingService.markPhysicalActivityPlanAsCompleted(id);
  }

  @ApiOperation({
    summary: 'Listado de actividades físicas asignadas por un Doctor',
    description:
      'Listado de actividades físicas.',
  })
  @ApiResponse({ status: 200, description: 'Actividades encontradas' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.DOCTOR)
  @Get('doctor/:doctorId')
  async getTrackingForDoctor(@Param('doctorId') doctorId: string) {
    return this.physicalActivityPlanTrackingService.getPhysicalActivityPlanTrackingForDoctor(doctorId);
  }
}
