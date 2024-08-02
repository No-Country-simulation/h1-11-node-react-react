import { IsInt, IsBoolean } from 'class-validator';

export class UpdateTrackingDto {
  @IsInt()
  id: number;

  @IsBoolean()
  completed: boolean;
}
