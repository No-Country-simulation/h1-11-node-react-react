import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'
import { CreatePatientDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }
  onModuleInit() {
    this.$connect();
    this.logger.log('Authservice connected to database')
  }


  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  async registerUser(createPatientDto: CreatePatientDto) {
    const { password, email, ...patientData } = createPatientDto;

    try {
      const patient = await this.patient.findUnique(
        {
          where: {
            email
          }
        }
      )

      if (patient) {
        throw new BadRequestException('Email already exists')
      }

      const newUser = await this.patient.create({
        data: {
          ...patientData,
          email,
          password: bcrypt.hashSync(password, 10)
        }
      });

      const { password: _, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
        token: await this.signJWT({ id: newUser.id })
      };
    } catch (error) {
      // console.log(error);
      // this.handleDBExceptions(error)
      throw new BadRequestException(error.message)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    try {
      const user = await this.patient.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        throw new BadRequestException('Email not found')
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Password not valid')
      }

      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: await this.signJWT({ id: user.id })
      };

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async checkAuthStatus(user) {
    return {
      user: user,
      token: await this.signJWT({ id: user.id })
    }
  }


  private handleDBExceptions(error: any): void {
    if (error.code === '23505') throw new BadRequestException(error.detail)
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
