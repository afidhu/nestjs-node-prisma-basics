import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BackgroundJobsService } from './background-jobs.service';
import { CreateBackgroundJobDto } from './dto/create-background-job.dto';
import { UpdateBackgroundJobDto } from './dto/update-background-job.dto';

@Controller('background-jobs')
export class BackgroundJobsController {
  constructor(private readonly backgroundJobsService: BackgroundJobsService) {}

  @Post()
  create(@Body() createBackgroundJobDto: CreateBackgroundJobDto) {
    return this.backgroundJobsService.create(createBackgroundJobDto);
  }

  @Get()
  findAll() {
    return this.backgroundJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backgroundJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBackgroundJobDto: UpdateBackgroundJobDto) {
    return this.backgroundJobsService.update(+id, updateBackgroundJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backgroundJobsService.remove(+id);
  }
}
