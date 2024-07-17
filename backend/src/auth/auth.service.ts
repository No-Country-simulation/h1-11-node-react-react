import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'
import { CreatePatientDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { generatePassword } from './utilities/utilities';


@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
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

  async registerPatient(createPatientDto: CreatePatientDto, user) {
    const { email, bloodFactor, birthdate, ...patientData } = createPatientDto;

    try {
      const patientemail = await this.user.findUnique(
        {
          where: {
            email
          }
        }
      )
      if (patientemail) {
        throw new BadRequestException('Email already exists')
      }

      const patientDni = await this.user.findUnique(
        {
          where: {
            dni: patientData.dni
          }
        }
      )
      if (patientDni) {
        throw new BadRequestException('DNI already exists')
      }

      let roleId = await this.role.findFirst({
        where: {
          name: 'PATIENT'
        },
        select: {
          id: true
        }
      })

      if (!roleId) {
        const role = await this.role.create({
          data: {
            name: 'PATIENT'
          }
        })
        roleId = { id: role.id };
      } else {
        roleId = { id: roleId.id };
      }

      const password = generatePassword();

      console.log(user.Doctor.id);


      const newUser = await this.user.create({
        data: {
          ...patientData,
          email,
          password: bcrypt.hashSync(password, 10),
          Patient: {
            create: {
              bloodFactor,
              birthdate,
              DoctorPatient: {
                create: {
                  doctorId: user.Doctor.id
                }
              }
            }
          },
          roles: {
            create: {
              roleId: roleId.id
            }
          }

        }
      });


      await this.sendEmailValidationLink(newUser.email, password);

      const { password: _, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
        token: await this.signJWT({ id: newUser.id })
      };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async registerDoctor(createdoctorDto: CreateDoctorDto) {
    const { email, especiality, license, ...doctorData } = createdoctorDto;

    try {
      const doctorEmail = await this.user.findUnique(
        {
          where: {
            email
          }
        }
      )
      if (doctorEmail) {
        throw new BadRequestException('Email already exists')
      }

      const doctorDni = await this.user.findUnique(
        {
          where: {
            dni: doctorData.dni
          }
        }
      )
      if (doctorDni) {
        throw new BadRequestException('DNI already exists')
      }

      let roleId = await this.role.findFirst({
        where: {
          name: 'DOCTOR'
        },
        select: {
          id: true
        }
      })


      if (!roleId) {
        const role = await this.role.create({
          data: {
            name: 'DOCTOR'
          }
        })
        roleId = { id: role.id };
      } else {
        roleId = { id: roleId.id };
      }

      const password = generatePassword();

      const newUser = await this.user.create({
        data: {
          ...doctorData,
          email,
          password: bcrypt.hashSync(password, 10),
          Doctor: {
            create: {
              especiality,
              license
            }
          },
          roles: {
            create: {
              roleId: roleId.id
            }
          }
        }
      });

      await this.sendEmailValidationLink(newUser.email, password);

      const { password: _, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
        token: await this.signJWT({ id: newUser.id })
      };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    try {
      const user = await this.user.findUnique({
        where: {
          email
        },
        include: {
          Patient: true,
          Doctor: true,
        },
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

  private async sendEmailValidationLink(email: string, password: string) {

    const token = this.jwtService.sign({ email });
    const link = `${process.env.WEBSERVICE_URL}/api/auth/validate/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Please click the following link to validate your email:</p>
      <a href="${link}">Validate your email</a>
      <p>Password: ${password}</p>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) {
      throw new InternalServerErrorException('Error sending email');
    }

    return true;
  }

  async validateEmail(token: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    const { email } = payload;
    if (!email) {
      throw new InternalServerErrorException('Email not in token');
    }

    const user = await this.user.findUnique({ where: { email } })
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.user.update({
      where: { email },
      data: { isValidateEmail: true },
    });

    return { success: true, message: 'Email successfully validated', email };
  }
}
