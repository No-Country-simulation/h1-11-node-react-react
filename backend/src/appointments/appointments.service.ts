import { Injectable, OnModuleInit, Logger, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { AppointmentState, CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppointmentsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AppointmentService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Appointments Service connected to database')
  }
  async create(createAppointmentDto: CreateAppointmentDto){
    const { patientId, doctorId, ...appointmentData } = createAppointmentDto;
    try {
      const overlappingAppointments = await this.findOverlappingAppointments(
        createAppointmentDto.date,
        createAppointmentDto.startTime,
        createAppointmentDto.endTime
      );
      if (overlappingAppointments.length > 0) {
        throw new ConflictException('Ya existe una cita que se superpone con este horario');
      }

      const newAppointment = await this.appointment.create({
        data: {
          ...appointmentData,
          patientId: patientId,
          doctorId: doctorId
        }
      });
      return { success: true, message: 'Cita médica creada correctamente', newAppointment };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(state?: AppointmentState, user?:  string) {

    const where = state ? { state } : {isActive: true};
    return this.appointment.findMany({
      where,
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        description: true,
        state: true,
        isActive: true,
        createdAt: true,
        patient: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                lastName: true
              }
            }
          }
        },
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                lastName: true
              }
            }
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.appointment.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        description: true,
        state: true,
        isActive: true,
        createdAt: true,
        patient: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                lastName: true
              }
            }
          }
        },
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                lastName: true
              }
            }
          }
        }
      }
    });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointment.findUnique({where: {id}});
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    if (updateAppointmentDto.date || updateAppointmentDto.startTime || updateAppointmentDto.endTime) {
      const overlappingAppointments = await this.findOverlappingAppointments(
        updateAppointmentDto.date as Date || appointment.date,
        updateAppointmentDto.startTime as Date || appointment.startTime,
        updateAppointmentDto.endTime as Date || appointment.endTime,
        id
      );

      if (overlappingAppointments.length > 0) {
        throw new ConflictException('Operación inválida. El horario seleccionado se superpone con otra cita existente');
      }
    }
    return this.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async remove(id: string) {
    return await this.appointment.update({
      where: { id },
      data: {
        isActive: false,
        state: AppointmentState.CANCELADA
      },
    });
  }

  async findOverlappingAppointments(date: Date, startTime: Date, endTime: Date, excludeId?: string) {
    return this.appointment.findMany({
      where: {
        date: date,
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } }
            ]
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } }
            ]
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } }
            ]
          }
        ]
      }
    });
  }
}
