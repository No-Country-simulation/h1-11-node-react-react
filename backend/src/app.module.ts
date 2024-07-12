import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { RoleModule } from './role/role.module';



@Module({
  imports: [AuthModule, EmailModule, RoleModule],
  providers: [EmailService],
})
export class AppModule {}
