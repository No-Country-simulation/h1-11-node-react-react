import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateLaboratoryDto, LaboratoryType } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class LaboratoriesService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('LaboratoriesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Laboratories Service connected to database')
  }
  async createLaboratory(createLaboratoryDto: CreateLaboratoryDto) {
    try {
      const newLaboratory = await this.laboratory.create({
        data: createLaboratoryDto
      });
      return { success: true, message: 'Laboratorio registrado correctamente', newLaboratory };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findLaboratories(params: {
    type?: LaboratoryType;
    name?: string;
  }) {
    const { type, name } = params;

    const where: Prisma.LaboratoryWhereInput = {};

    if (type) {
      where.type = type;
    }

    if (name) {
      where.name = { contains: name };
    }
    return await this.laboratory.findMany({
      where,
      orderBy: {name: 'asc'}
      });
  }

  findOneLaboratory(id: string) {
    return this.laboratory.findUnique({where: {id}});
  }

  async updateLaboratory(id: string, updateLaboratoryDto: UpdateLaboratoryDto) {
    const laboratory = await this.laboratory.findUnique({where: {id}});
    if (!laboratory) {
      throw new NotFoundException('Laboratorio no encontrada');
    }
    return this.laboratory.update({
      where: { id },
      data: updateLaboratoryDto,
    });
  }

  async disableLaboratory(id: string) {
    return await this.laboratory.update({
      where: { id },
      data: {
        isActive: false
      },
    });
  }
}
