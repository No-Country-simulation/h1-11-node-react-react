import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";

export class ResetPassword {
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsStrongPassword()
  confirmPassword: string;
}
