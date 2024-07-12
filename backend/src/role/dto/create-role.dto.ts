import { ApiProperty } from "@nestjs/swagger";
import { IsString, minLength } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'PATIENT' })
  @IsString()
  name: string;
}
