import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';



@Module({
  imports: [AuthModule, EmailModule],
  providers: [EmailService],
})
export class AppModule {}
