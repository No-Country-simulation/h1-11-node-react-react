import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentState, CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try{
      return await this.appointmentsService.create(createAppointmentDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException('No se pudo crear la cita');
    }
  }

  @Get()
  async findAll(@Query('state') state?: AppointmentState) {
    return await this.appointmentsService.findAll(state);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const appointment =  this.appointmentsService.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }
    return appointment;
  }

  @Patch(':id')
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

  @Delete(':id')
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
