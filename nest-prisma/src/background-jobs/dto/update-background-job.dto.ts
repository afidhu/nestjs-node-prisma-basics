import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundJobDto } from './create-background-job.dto';

export class UpdateBackgroundJobDto extends PartialType(CreateBackgroundJobDto) {}
