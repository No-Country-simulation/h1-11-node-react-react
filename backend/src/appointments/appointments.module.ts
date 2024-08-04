import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [AuthModule]
})
export class AppointmentsModule {}
