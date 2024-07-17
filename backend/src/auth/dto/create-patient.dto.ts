import { ApiProperty } from "@nestjs/swagger";
import { Sex } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class CreatePatientDto {

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  lastName: string;

  // @IsString()
  // @MinLength(6)
  // @MaxLength(50)
  // @Matches(
  //   /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'The password must have a Uppercase, lowercase letter and a number'
  // })
  // password: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  dni: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  address: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  @MinLength(1)
  phone: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  province: string

  @ApiProperty()
  @IsString()
  @MinLength(1)
  location: string;

  @ApiProperty({ enum: Sex, enumName: "Sex" })
  @IsEnum(Sex, { message: 'Sex must be either "M" or "F"' })
  sex: Sex;

  @ApiProperty()
  @IsString()
  bloodFactor: string;

}
