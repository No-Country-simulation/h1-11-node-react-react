import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: 'af3a100c-2efa-4385-906b-bdb8fc65296a' })
  id: string;

  @ApiProperty({ example: 'PATIENT' })
  name: string;

  @ApiProperty({ example: '2024-07-11T23:51:23.734Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-07-11T23:51:23.734Z' })
  updatedAt: Date;
}
