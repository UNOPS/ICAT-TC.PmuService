import { Controller,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Project } from 'src/project/entity/project.entity';
import { Repository } from 'typeorm-next';
import { Report } from './entity/report.entity';
import { ReportService } from './report.service';

@Crud({
    model: {
        type: Report,
    },
    query: {
        join: {
            country: {
                eager: true,
            },
            sector: {
                eager: true,
            },
            ndc: {
                eager: true,
            },
            climateaction: {
                eager: true,
            },
        },
    },
})

@Controller('report')
export class ReportController implements CrudController<Report>{
    constructor(public service: ReportService,
        @InjectRepository(Sector)
        public sectorRepo: Repository<Sector>,
        @InjectRepository(Sector)
        public projectRepo: Repository<Project>){}

    get base(): CrudController<Report>{
        return this;
    }
}
