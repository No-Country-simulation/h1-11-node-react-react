import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto, LoginUserDto } from './dto';

import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserWithTokenResponseDto } from './dto/response-create-patient';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiResponse({ status: 201, description: 'patient was created', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiBearerAuth()
  @Post('register-patient')
  @Auth(ValidRoles.DOCTOR)
  createPatient(@Body() createPatientDto: CreatePatientDto, @GetUser() user) {
    return this.authService.registerPatient(createPatientDto, user);
  }

  @ApiResponse({ status: 201, description: 'Doctor was created', type: CreateDoctorDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @Post('register-doctor')
  createDoctor(@Body() createdoctorDto: CreateDoctorDto) {
    return this.authService.registerDoctor(createdoctorDto);
  }

  @ApiResponse({ status: 201, description: 'User was login', type: UserDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({ status: 201, description: 'User was check-status and revalidate token', type: UserDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiExcludeEndpoint()
  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('validate/:token')
  async validateEmail(@Param('token') token: string, @Res() res: Response) {
    const result = await this.authService.validateEmail(token);
    if (result.success) {
      // return res.redirect(`${process.env.FRONTEND_URL}/email-validated?email=${result.email}`);
      return res.redirect('https://www.google.com.pe');
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/email-validation-failed`);
    }
  }

  // @Get()
  // @UseGuards(AuthGuard())
  // findAll(
  //   // @Req() request: Express.Request
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
  //   @RawHeadres() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders
  // ) {

  //   return { user, userEmail, rawHeaders, headers };
  // }


  // @Get()
  // @RoleProtected(ValidRoles.superUser, ValidRoles.user)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // findAll(
  //   @GetUser() user: User,
  // ) {

  //   return { user,};
  // }

  // @Get()
  // @Auth(ValidRoles.student)
  // findAll(
  //   // @GetUser() user,
  // ) {

  //   return 'hola';
  // }

  // @Get(':id')
  // @Auth(ValidRoles.admin)
  // findOne(
  //   @Param('id') id: string,
  //   @GetUser() user,
  // ) {
  //   return {
  //     id,
  //     user
  //   }
  //   return this.authService.findOne(+id);
  // }


}
