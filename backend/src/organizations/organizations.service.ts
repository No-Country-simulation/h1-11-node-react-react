import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrganizationsService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('OrganizationsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Organizations Service connected to database')
  }
  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const newOrganization = await this.organization.create({
        data: createOrganizationDto
      });
      return { success: true, message: 'Organización registrada correctamente', newOrganization };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    return await this.organization.findMany({});
  }

  findOne(id: string) {
    return this.organization.findUnique({where: {id}});
  }

  remove(id: string) {
    return this.organization.delete({where: {id}});
  }
}
