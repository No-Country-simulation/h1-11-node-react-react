import { Module } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  imports: [AuthModule]
})
export class TreatmentsModule {}
