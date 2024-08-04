import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EmailService } from 'src/email/email.service';
import { TreatmentsService } from 'src/treatments/treatments.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
    private readonly treatmentsService: TreatmentsService
  ) {}
}
