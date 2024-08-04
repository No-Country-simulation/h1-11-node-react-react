import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentState, CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiQuery, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({
    summary: 'Agendar una cita o turno.',
    description:
      'Un usuario puede agendar una cita.',
  })
  @ApiResponse({ status: 201, description: 'Cita médica agendada correctamente', type: CreateAppointmentDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Post('register-appointment')
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({
    summary: 'Listado de citas o turnos médicos programadas',
    description:
      'A user with admin role or consultant role, can get all users.',
  })
  @ApiResponse({ status: 201, description: 'Lista de citas o turnos programados' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get()
  @ApiQuery({
    name: 'state',
    type: String,
    required: false,
  })
  findAll(@Query('state') state?: AppointmentState,  user? : any) {
    return this.appointmentsService.findAll(state,user);
  }

  @ApiOperation({
    summary: 'Retorna información de una cita o turno médico.',
    description:
      'Cada usuario tiene como respuesta citas asignadas o propias.',
  })
  @ApiResponse({ status: 201, description: 'Cita encontrada' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    const appointment =  this.appointmentsService.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }
    return appointment;
  }

  @ApiOperation({
    summary: 'Actualizar o reprogramar una cita o turno médico.',
    description:
      'Permite actualizar la información o reprogramar una cita o turno médico.',
  })
  @ApiResponse({ status: 201, description: 'Cita actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.DOCTOR)
  @Patch('update-appointment/:id')
  async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    try {
      return await this.appointmentsService.update(id, updateAppointmentDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException('No se pudo actualizar la cita');
    }
  }

  @ApiOperation({
    summary: 'Cancelar una cita o turno médico.',
    description:
      'Permite al usuario cancelar una cita o turno médico.',
  })
  @ApiResponse({ status: 201, description: 'Cita cancelada' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Auth(ValidRoles.DOCTOR)
  @Delete('cancel-appointment/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.appointmentsService.remove(id);
      return { message: 'Cita declinada con éxito' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('No se declinar la cita');
    }
  }
}
