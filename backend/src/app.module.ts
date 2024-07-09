import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AuthModule, EmailModule, AppointmentsModule],
  providers: [EmailService],
})
export class AppModule {}
