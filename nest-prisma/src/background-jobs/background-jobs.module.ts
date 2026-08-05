import { Module } from '@nestjs/common';
import { BackgroundJobsService } from './background-jobs.service';
import { BackgroundJobsController } from './background-jobs.controller';

@Module({
  controllers: [BackgroundJobsController],
  providers: [BackgroundJobsService],
})
export class BackgroundJobsModule {}
