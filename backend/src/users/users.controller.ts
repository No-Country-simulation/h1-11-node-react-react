import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithTokenResponseDto } from 'src/auth/dto/response-create-patient';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'get All users', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @ApiOperation({
    summary: 'Búsqueda de médicos',
    description:
      'Médicos.',
  })
  @ApiResponse({ status: 201, description: 'Filtro de médicos' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Filter by doctor name' })
  @ApiQuery({
    name: 'lastName',
    type: String,
    required: false,
    description: 'Filter by doctor lastname' })
  @Get('search-doctors')
  findDoctors(@Query('name') name?: string, @Query('name') lastName?: string) {
    return this.usersService.findDoctorsByName(lastName,name);
  }

  @ApiOperation({
    summary: 'Búsqueda de pacientes',
    description:
      'Pacientes.',
  })
  @ApiResponse({ status: 201, description: 'Filtro de pacientes' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Filter by doctor name' })
  @ApiQuery({
    name: 'lastName',
    type: String,
    required: false,
    description: 'Filter by doctor lastname' })
  @ApiQuery({
    name: 'dni',
    type: String,
    required: false,
    description: 'Filter by doctor DNI number' })
  @Get('search-patients')
  findPatients(@Query('name') name?: string, @Query('name') lastName?: string, @Query('dni') dni?: string) {
    return this.usersService.findPatientByName(lastName,name,dni);
  }

  @ApiResponse({ status: 200, description: 'get user by id', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @ApiResponse({ status: 200, description: 'delete user by id', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
