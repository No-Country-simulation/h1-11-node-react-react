import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

import { AppointmentsModule } from './appointments/appointments.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [AuthModule, EmailModule, AppointmentsModule, RoleModule, UsersModule, OrganizationsModule],
  providers: [EmailService],
})
export class AppModule {}
