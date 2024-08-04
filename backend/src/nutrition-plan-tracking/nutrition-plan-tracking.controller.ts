import { Controller, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { NutritionPlanTrackingService } from './nutrition-plan-tracking.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('NutritionPlanTracking')
@Controller('nutrition-plan-tracking')
export class NutritionPlanTrackingController {
  constructor(private readonly nutritionPlanTrackingService: NutritionPlanTrackingService) {}

  @ApiOperation({
    summary: 'Marcar como completado el registro de seguimiento del Plan de Nutrición',
    description:
      'Los pacientes pueden marcar como completado un registro de seguimiento del plan de nutrución asignado.',
  })
  @ApiResponse({ status: 200, description: 'Actividad completada'})
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.PATIENT)
  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.nutritionPlanTrackingService.markNutritionPlanAsCompleted(id);
  }

  @ApiOperation({
    summary: 'Listado de actividades de seguimiento asignadas por un Doctor',
    description:
      'Actividaddes de seguimiento encontradas.',
  })
  @ApiResponse({ status: 200, description: '' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.DOCTOR)
  @Get('doctor/:doctorId')
  async getTrackingForDoctor(@Param('doctorId') doctorId: string) {
    return this.nutritionPlanTrackingService.getNutritionPlanTrackingForDoctor(doctorId);
  }
}
