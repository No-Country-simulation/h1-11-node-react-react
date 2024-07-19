import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, Query } from '@nestjs/common';
import { LaboratoriesService } from './laboratories.service';
import { CreateLaboratoryDto, LaboratoryType } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Laboratories')
@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly laboratoriesService: LaboratoriesService) {}

  @ApiOperation({
    summary: 'Registrar un Laboratorio',
    description:
      'El administrador puede registrar los diferentes laboratorios de la Institución.',
  })
  @ApiResponse({ status: 201, description: 'Laboratorio registrado correctamente', type: CreateLaboratoryDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Post('create-laboratory')
  create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return this.laboratoriesService.createLaboratory(createLaboratoryDto);
  }

  @ApiOperation({
    summary: 'Listado de laboratorios disponibles',
    description:
      'Laboratorios médicos.',
  })
  @ApiResponse({ status: 201, description: 'Listado de laboratorios disponibles' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'type',
    type: String,
    required: false,
  })
  @Get()
  findAll(@Query('type') type?: LaboratoryType) {
    return this.laboratoriesService.findLaboratories(type);
  }

  @ApiOperation({
    summary: 'Retorna información de un laboratorio.',
    description:
      'Retorna información de un laboratorio.',
  })
  @ApiResponse({ status: 201, description: 'Laboratorio encontrado' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    const organization =  this.laboratoriesService.findOneLaboratory(id);
    if (!organization) {
      throw new NotFoundException('Laboratorio no encontrado');
    }
    return organization;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaboratoryDto: UpdateLaboratoryDto) {
    return this.laboratoriesService.updateLaboratory(id, updateLaboratoryDto);
  }

  @ApiOperation({
    summary: 'Deshabilitar un laboratorio.',
    description:
      'Permite deshabilitar un laboratorio.',
  })
  @ApiResponse({ status: 201, description: 'Laboratorio dashabilitado' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Delete('disable/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.laboratoriesService.disableLaboratory(id);
      return { message: 'Laboratorio deshabilitado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('No se pudo deshabilitar el laboratorio');
    }
  }
}
