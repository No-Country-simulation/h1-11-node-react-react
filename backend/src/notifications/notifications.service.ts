import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Medication, MedicationFrequency, PrismaClient } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class NotificationsService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger(NotificationsService.name);
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Notifications Service connected to database')
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const now = new Date();
    const treatments = await this.treatment.findMany({
      include: {
        Patient: {
          include: {
            user: true
          }
        },
        Medications: true
      },
    })

    treatments.forEach(treatment => {
      const patientEmail = treatment.Patient.user.email;
      treatment.Medications.forEach(medication => {
        const shouldSendNotification = this.shouldSendNotification(medication.frequency, now);
        if (shouldSendNotification) {
          this.sendNotification(patientEmail, medication);
        }
      });
    });
  }

  private shouldSendNotification(frequency: MedicationFrequency, now: Date): boolean {
    const hours = now.getHours();
    switch (frequency) {
      case MedicationFrequency.ONCE_A_DAY:
        return hours === 8;
      case MedicationFrequency.TWICE_A_DAY:
        return hours === 8 || hours === 20;
      case MedicationFrequency.THREE_TIMES_A_DAY:
        return hours === 8 || hours === 14 || hours === 20;
      default:
        return false;
    }
  }

  private async sendNotification(email: string, medication: Medication) {
    const url = `localhost:3000/medication-tracking/${medication.id}`;

    await this.emailService.sendEmail({
      to: email,
      subject: 'Recordatorio de Medicación',
      html: `<p>Este es un recordatorio para tomar tu medicación: <strong>${medication.medicine} (${medication.dosage})</strong></p>
      <br>
      <p>Por favor, no olvides de registrar tu seguimiento en el siguiente enlace: ${url}.</p>
      <br>
      <p>Recuerda que esto nos permite mejorar y apoyar tu tratamiento.</p>
      <br>
      <p>Atte: JustinaIO</p>`,
    });
  }

}
