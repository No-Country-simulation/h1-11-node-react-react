import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export enum AppointmentState {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA',
  NO_ASISTIDA = 'NO_ASISTIDA',
  REPROGRAMADA = 'REPROGRAMADA'
}

export class CreateAppointmentDto {

  @ApiProperty()
  @IsString()
  @MinLength(1)
  patientId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  doctorId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @ApiProperty({ enum: AppointmentState, enumName: "AppointmentState" }) // Documenta el enum para Swagger
  @IsEnum(AppointmentState, { message: 'State must be either "PENDIENTE" or "CONFIRMADA" or "CANCELADA" or "COMPLETADA" or "NO_ASISTIDA" or "REPROGRAMADA"' })
  @IsOptional()
  state: AppointmentState;
}
