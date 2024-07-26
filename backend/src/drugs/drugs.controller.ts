import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Medicines')
@Controller('medicines')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @ApiOperation({
    summary: 'Registrar un nuevo medicamento.',
    description:
      'Permite registrar un nuevo medicamento disponible.',
  })
  @ApiResponse({ status: 201, description: 'Medicamento registrado correctamente', type: CreateDrugDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Post('register-medicine')
  @Post()
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugsService.create(createDrugDto);
  }

  @ApiOperation({
    summary: 'Listado de medicinas.',
    description:
      'Retorna el listado de medicamentos registrados.',
  })
  @ApiResponse({ status: 201, description: 'Medicinas encontradas.' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'isActive',
    type: Boolean ,
    required: false,
  })
  @Get()
  findAll() {
    return this.drugsService.findAll();
  }

  @ApiOperation({
    summary: 'Retorna información de un medicamento.',
    description:
      'Retorna información de un medicamento.',
  })
  @ApiResponse({ status: 201, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar la información de una medicina.',
    description:
      'Permite actualizar la información de una medicina.',
  })
  @ApiResponse({ status: 201, description: 'Medicina actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(id, updateDrugDto);
  }

  @ApiOperation({
    summary: 'Desactivar un medicamento.',
    description:
      'Permite al usuario administrador dar de baja un medicamento.',
  })
  @ApiResponse({ status: 201, description: 'Medicamento dado de baja' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drugsService.remove(id);
  }
}
