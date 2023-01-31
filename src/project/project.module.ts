import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ndc } from 'src/master-data/ndc/ndc.entity';
import { SubNdc } from 'src/master-data/ndc/sub-ndc.entity';
import { ProjectStatus } from 'src/master-data/project-status/project-status.entity';
import { Sector } from 'src/master-data/sector/sector.entity';
import { EmailNotificationService } from 'src/notifications/email.notification.service';
import { Project } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService, EmailNotificationService],
  exports: [ProjectService],
})
export class ProjectModule {}
