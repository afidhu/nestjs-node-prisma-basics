import { Injectable } from '@nestjs/common';
import { CreateBackgroundJobDto } from './dto/create-background-job.dto';
import { UpdateBackgroundJobDto } from './dto/update-background-job.dto';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class BackgroundJobsService {


  @Cron('*/1 * * * * *')
  handleCron() {
    console.log('Running a task every one se');
  }

  @Interval(5000)
  generateReport() {
    console.log('Generating report...');
  }

  @Timeout(10000)
  delayedTask() {
    console.log('This task is delayed by 10 seconds');
  }

  create(createBackgroundJobDto: CreateBackgroundJobDto) {
    return 'This action adds a new backgroundJob';
  }


  findAll() {
    return `This action returns all backgroundJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} backgroundJob`;
  }

  update(id: number, updateBackgroundJobDto: UpdateBackgroundJobDto) {
    return `This action updates a #${id} backgroundJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} backgroundJob`;
  }
}
