import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TreatmentsService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('TreatmentsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Treatment Service connected to database')
  }
  create(createTreatmentDto: CreateTreatmentDto) {
    return this.treatment.create({
      data: {
        ...createTreatmentDto,
        Medications: {
          create: createTreatmentDto.medications?.map(med => ({
            ...med,
            frequency: med.frequency,
            MedicationTracking: {
              create: {
                patientId: createTreatmentDto.patientId,
                completed: false,
              },
            },
          })) || [],
        },
        PhysicalActivityPlans: {
          create: createTreatmentDto.physicalActivityPlans?.map(plan => ({
            ...plan,
            exercises: {
              create: plan.exercises,
            },
            PhysicalActivityPlanTracking: {
              create: {
                patientId: createTreatmentDto.patientId,
                completed: false,
              },
            },
          })) || [],
        },
        NutritionPlans: {
          create: createTreatmentDto.nutritionPlans?.map(plan => ({
            ...plan,
            meals: {
              create: plan.meals,
            },
            restrictions: {
              create: plan.restrictions,
            },
            NutritionPlanTracking: {
              create: {
                patientId: createTreatmentDto.patientId,
                completed: false,
              },
            },
          })) || [],
        },
      },
    });
  }

  findAll() {
    return this.treatment.findMany({
      include: {
        Medications: true,
        PhysicalActivityPlans: true,
        NutritionPlans: true,
        },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} treatment`;
  }

  update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return `This action updates a #${id} treatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatment`;
  }
}
