import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentDto } from 'src/appointments/dto/create-appointment.dto';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOperation({
    summary: 'Registrar una organización',
    description:
      'El administrador puede registrar nuevas organizaciones aliadas.',
  })
  @ApiResponse({ status: 201, description: 'Organización registrada correctamente', type: CreateAppointmentDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Post('register-organization')
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @ApiOperation({
    summary: 'Listado de organizaciones aliadas',
    description:
      'Organizaciones aliadas.',
  })
  @ApiResponse({ status: 201, description: '' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @ApiOperation({
    summary: 'Retorna información de una organización.',
    description:
      'Retorna información de una organización.',
  })
  @ApiResponse({ status: 201, description: 'Organización encontrada' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    const organization =  this.organizationsService.findOne(id);
    if (!organization) {
      throw new NotFoundException('Organización no encontrada');
    }
    return organization;
  }

  @ApiOperation({
    summary: 'Dar de baja la información de una organización aliada.',
    description:
      'Permite dar de baja a una organización.',
  })
  @ApiResponse({ status: 201, description: 'Organización eliminada' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
