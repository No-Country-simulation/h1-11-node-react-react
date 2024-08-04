import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { EmailService } from '../email/email.service';
import { TreatmentsService } from 'src/treatments/treatments.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailService, TreatmentsService]
})
export class NotificationsModule {}
