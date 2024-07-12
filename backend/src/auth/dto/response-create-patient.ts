import { ApiProperty } from "@nestjs/swagger";
import { Sex } from "@prisma/client";


class User {
  @ApiProperty({ description: 'ID único del usuario',example: '123e4567-e89b-12d3-a456-426614174001' })
  id: string;

  @ApiProperty({ description: 'Nombre del usuario',example: 'John' })
  name: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Número de DNI del usuario',example: '12345678' })
  dni: string;

  @ApiProperty({ description: 'Dirección del usuario', example: '123 Main St' })
  address: string;

  @ApiProperty({ description: 'Número de teléfono del usuario', example: '555-1234' })
  phone: string;

  @ApiProperty({ description: 'Provincia del usuario', example: 'Santiago' })
  province: string;

  @ApiProperty({ description: 'Ubicación del usuario', example: 'Santiago, Chile' })
  location: string;

  @ApiProperty({ enum: Sex, description: 'Género del usuario (M, F)', example: Sex.F })
  sex: string;

  @ApiProperty({ description: 'Indica si el correo electrónico del usuario está validado' })
  isValidateEmail: boolean;

  @ApiProperty({ description: 'Indica si el usuario está activo' })
  isActive: boolean;

  @ApiProperty({ type: Date, description: 'Fecha de creación del usuario' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'Fecha de última actualización del usuario' })
  updatedAt: Date;
}

export class UserWithTokenResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
