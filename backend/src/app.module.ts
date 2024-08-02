import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

import { AppointmentsModule } from './appointments/appointments.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { DrugsModule } from './drugs/drugs.module';
import { TreatmentsModule } from './treatments/treatments.module';

@Module({
  imports: [AuthModule, EmailModule, AppointmentsModule, RoleModule, UsersModule, OrganizationsModule, LaboratoriesModule, DrugsModule, TreatmentsModule],
  providers: [EmailService],
})
export class AppModule {}
