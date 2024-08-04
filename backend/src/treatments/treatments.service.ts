import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { MedicationFrequency, PrismaClient } from '@prisma/client';

@Injectable()
export class TreatmentsService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('TreatmentsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Treatment Service connected to database')
  }
  async create(createTreatmentDto: CreateTreatmentDto) {
    const treatment = await this.treatment.create({
      data: {
        description: createTreatmentDto.description,
        startDate: createTreatmentDto.startDate,
        endDate: createTreatmentDto.endDate,
        patientId: createTreatmentDto.patientId,
        doctorId: createTreatmentDto.doctorId,
        Medications: {
          create: createTreatmentDto.Medications?.map(med => ({
            ...med,
            frequency: med.frequency,
          })) || [],
        },
        PhysicalActivityPlans: {
          create: createTreatmentDto.PhysicalActivityPlans?.map(plan => ({
            ...plan,
            exercises: {
              create: plan.exercises,
            },
          })) || [],
        },
        NutritionPlans: {
          create: createTreatmentDto.NutritionPlans?.map(plan => ({
            ...plan,
            meals: {
              create: plan.meals || [],
            },
            restrictions: {
              create: plan.restrictions,
            },
          })) || [],
        },
      },
      include: {
        Medications: true,
        PhysicalActivityPlans: true,
        NutritionPlans: true,
      }
    });
    await this.createTrackings(treatment);

    return treatment;
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

  private async createTrackings(treatment) {
    const startDate = new Date(treatment.startDate);
    const endDate = new Date(treatment.endDate);

    for (const medication of treatment.Medications) {
      const trackingDates = this.generateTrackingDates(startDate, endDate, medication.frequency);
      for (const trackingDate of trackingDates) {
        await this.medicationTracking.create({
          data: {
            date: trackingDate,
            medicationId: medication.id,
            patientId: treatment.patientId
            //treatmentId: treatment.id,
          },
        });
      }
    }

    const planDays = this.getDaysBetweenDates(startDate, endDate);

    for (const plan of treatment.PhysicalActivityPlans) {
      for (const day of planDays) {
        await this.physicalActivityPlanTracking.create({
          data: {
            date: day,
            physicalActivityPlanId: plan.id,
            //treatmentId: treatment.id,
            patientId: treatment.patientId
          },
        });
      }
    }

    for (const plan of treatment.NutritionPlans) {
      for (const day of planDays) {
        await this.nutritionPlanTracking.create({
          data: {
            date: day,
            nutritionPlanId: plan.id,
            //treatmentId: treatment.id,
            patientId: treatment.patientId
          },
        });
      }
    }
  }

  private generateTrackingDates(startDate: Date, endDate: Date, frequency: MedicationFrequency): Date[] {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));

      switch (frequency) {
        case MedicationFrequency.ONCE_A_DAY:
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case MedicationFrequency.TWICE_A_DAY:
          currentDate.setHours(currentDate.getHours() + 12);
          if (currentDate.getHours() >= 24) {
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(currentDate.getHours() - 24);
          }
          break;
        case MedicationFrequency.THREE_TIMES_A_DAY:
          currentDate.setHours(currentDate.getHours() + 8);
          if (currentDate.getHours() >= 24) {
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(currentDate.getHours() - 24);
          }
          break;
      }
    }

    return dates;
  }

  private getDaysBetweenDates(startDate: Date, endDate: Date): Date[] {
    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }
}
