import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DrugsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('MedicinesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Medicines Service connected to database')
  }

  async create(createDrugDto: CreateDrugDto) {
    const { laboratoryId, ...drugData } = createDrugDto;
    try {
      const newMedicine = await this.drug.create({
        data: {
          ...drugData,
          laboratoryId: laboratoryId
        }
      });
      return { success: true, message: 'Medicina registrada correctamente', newMedicine };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    //const where = isActive ? { isActive } : {isActive: true};
    return this.drug.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        isActive: true,
        laboratory: {
          select: {
            id: true
          }
        },
      }
    });
  }

  findOne(id: string) {
    return this.drug.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        laboratory: {
          select: {
            id: true
          }
        },
      }
    });
  }

  async update(id: string, updateDrugDto: UpdateDrugDto) {
    const drug = await this.drug.findUnique({where: {id}});
    if (!drug) {
      throw new NotFoundException('Medicina no encontrada');
    }
    return this.drug.update({
      where: { id },
      data: updateDrugDto,
    });
  }

  async remove(id: string) {
    return await this.drug.update({
      where: { id },
      data: {
        isActive: false
      },
    });
  }
}
