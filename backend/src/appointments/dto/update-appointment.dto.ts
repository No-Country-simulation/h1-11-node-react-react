import { AppointmentState, CreateAppointmentDto } from './create-appointment.dto';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsEnum(AppointmentState)
  @IsOptional()
  state?: AppointmentState;
}
