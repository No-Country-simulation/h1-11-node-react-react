import { Type } from 'class-transformer';
import { AppointmentState } from './create-appointment.dto';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startTime?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endTime?: Date;

  @ApiProperty()
  @IsEnum(AppointmentState)
  @IsOptional()
  state?: AppointmentState;
}
