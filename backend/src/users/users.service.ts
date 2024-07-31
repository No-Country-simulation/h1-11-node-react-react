import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserResponse } from './dto/response-get-user.dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UsersService')

  onModuleInit() {
    this.$connect();
    this.logger.log('UsersService connected to database')
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [totalUsers, users] = await Promise.all([
      this.user.count({ where: { isActive: true } }),
      this.user.findMany({
        where: { isActive: true },
        include: {
          Doctor: true,
          Patient: true,
        }
      })
    ])

    users.forEach(user => delete user.password)

    const rpta = users.map(user => {
      const { Doctor, Patient, password: _, ...rest } = user;
      const userPlain: UserResponse = { ...rest, role: '' };
      if (Patient) {
        userPlain.patient = Patient;
        userPlain.role = 'patient'
      }
      if (Doctor) {
        userPlain.doctor = Doctor;
        userPlain.role = 'patient'
      }
      return userPlain
    })

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      totalUsers,
      page,
      totalPages,
      next: (totalUsers - (page * limit)) > 0 ? `api/users?page=${page + 1}&limit=${limit}` : null,
      prev: (page - 1 > 0) ? `api/users?page=${page - 1}&limit=${limit}` : null,
      rpta
    }
  }

  async findDoctorsByName(lastName?: string, name?: string) {

    /*if (lastName) {
      where.user.OR = [{lastName: { contains: lastName }}, {lastName: { startsWith: lastName }}, {lastName: { endsWith: lastName }}];
    }

    if (name) {
      where.user.OR = [{name: { contains: name }}, {name: { startsWith: name }}, {name: { endsWith: name }}];
    }*/
    return await this.doctor.findMany({
      where: {
        user: {
          OR : [
            name ? {name: { contains: name }}: undefined,
            lastName ? { lastName: {contains: lastName }}: undefined
          ].filter(Boolean)
        }
      },
      include: {
        user: true
      }
    });
  }

  async findPatientByName(lastName?: string, name?: string, dni?: string) {

    /*if (lastName) {
      where.user.OR = [{lastName: { contains: lastName }}, {lastName: { startsWith: lastName }}, {lastName: { endsWith: lastName }}];
    }

    if (name) {
      where.user.OR = [{name: { contains: name }}, {name: { startsWith: name }}, {name: { endsWith: name }}];
    }*/
    return await this.patient.findMany({
      where: {
        user: {
          OR : [
            name ? {name: { contains: name }}: undefined,
            lastName ? { lastName: {contains: lastName }}: undefined,
            dni ? { dni: {equals: dni }}: undefined
          ].filter(Boolean)
        }
      },
      include: {
        user: true
      }
    });
  }

  async findOne(id: string) {
    const user = await this.user.findUnique({
      where: { id, isActive: true },
      include: {
        Patient: true,
        Doctor: true,
      }
    });

    if (!user) throw new BadRequestException('User not found')

    delete user.password;
    if (!user.Doctor) {
      delete user.Doctor;
    }
    if (!user.Patient) {
      delete user.Patient;
    }

    return {
      ...user,
      role: (user.Doctor ? 'doctor' : 'patient')
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.findOne(id)

    const transaction = await this.$transaction(async (prisma) => {

      const patient = await prisma.patient.findUnique({
        where: { userId: id },
      });

      if (patient) {
        await prisma.patient.update({
          where: { userId: id },
          data: { isActive: false },
        });
      }

      const doctor = await prisma.doctor.findUnique({
        where: { userId: id },
      });

      if (doctor) {
        await prisma.doctor.update({
          where: { userId: id },
          data: { isActive: false },
        });
      }

      const user = await prisma.user.update({
        where: { id },
        data: { isActive: false },
        include: { Patient: true, Doctor: true }
      });

      return user;
    });

    return transaction;
  }
}
