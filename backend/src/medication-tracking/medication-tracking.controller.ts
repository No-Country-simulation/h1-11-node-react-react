import { Controller, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { MedicationTrackingService } from './medication-tracking.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('MedicationTracking')
@Controller('medication-tracking')
export class MedicationTrackingController {
  constructor(private readonly medicationTrackingService: MedicationTrackingService) {}

  @ApiOperation({
    summary: 'Marcar como completado el registro de seguimiento de medicación asignada',
    description:
      'Los pacientes pueden marcar como completada un registro de seguimiento de medicación asignado.',
  })
  @ApiResponse({ status: 200, description: 'Actividad completada'})
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.PATIENT)
  @Patch('complete/:id')
  async markAsCompleted(@Param('id') id: string) {
    return this.medicationTrackingService.markMedicationAsCompleted(id);
  }

  @ApiOperation({
    summary: 'Listado de seguimiento de medicaciones asignadas por un Doctor',
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
    return this.medicationTrackingService.getMedicationTrackingForDoctor(doctorId);
  }
}
