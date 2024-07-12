import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoleService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('RoleService');

  onModuleInit() {
    this.$connect();
    this.logger.log('RoleService connected to database')
  }
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    try {
      const newRole = await this.role.create({
        data: {
          name
        }
      })

      return newRole;
    } catch (error) {
      throw new BadRequestException('Role already exits');
    }
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
