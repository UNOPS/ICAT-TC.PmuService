import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorController } from 'src/master-data/sector/sector.controller';
import { Sector } from 'src/master-data/sector/sector.entity';
import { SectorService } from 'src/master-data/sector/sector.service';
import { Project } from 'src/project/entity/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Report } from './entity/report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
    imports: [TypeOrmModule.forFeature([Report, Sector, Project])],
    controllers: [ReportController],
    providers: [ReportService, SectorService, ProjectService],
    exports: [ReportService, SectorService, ProjectService],
})
export class ReportModule {}
