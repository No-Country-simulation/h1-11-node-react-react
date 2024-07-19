import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetResponseDto {
  @ApiProperty({ example: 'contraseña cambiada', description: 'Confirmation message' })
  message: string;
}
