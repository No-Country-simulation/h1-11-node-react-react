import { IsString, minLength } from "class-validator";

export class CreateRoleDto {
  @IsString()
  name: string;
}
