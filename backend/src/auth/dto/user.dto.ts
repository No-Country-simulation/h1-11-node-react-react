import { ApiProperty } from "@nestjs/swagger";
import { Sex } from "@prisma/client";


export class User {
  @ApiProperty({ description: 'ID único del usuario' })
  id: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ description: 'Número de DNI del usuario' })
  dni: string;

  @ApiProperty({ description: 'Dirección del usuario' })
  address: string;

  @ApiProperty({ description: 'Número de teléfono del usuario' })
  phone: string;

  @ApiProperty({ description: 'Provincia del usuario' })
  province: string;

  @ApiProperty({ description: 'Ubicación del usuario' })
  location: string;

  @ApiProperty({ enum: Sex, description: 'Género del usuario (M, F)' })
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

export class UserDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}



