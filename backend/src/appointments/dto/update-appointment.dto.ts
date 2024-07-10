import { Type } from 'class-transformer';
import { AppointmentState, CreateAppointmentDto } from './create-appointment.dto';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startTime?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endTime?: Date;

  @IsEnum(AppointmentState)
  @IsOptional()
  state?: AppointmentState;
}
