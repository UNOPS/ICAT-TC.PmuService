import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
//import { Assessment } from 'src/assesment/entity/assesment.entity';
import { Country } from 'src/country/entity/country.entity';
import { Ndc } from 'src/master-data/ndc/ndc.entity';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Project } from 'src/project/entity/project.entity';
//import { ReportAssessment } from './entity/report-assessment.entity';
//import { ReportNdc } from './entity/report-ndc.entity';
//import { ReportProject } from './entity/report-project.entity';
//import { ReportSector } from './entity/report-sector.entity';
import { Report } from './entity/report.entity';

@Injectable()
export class ReportService extends TypeOrmCrudService<Report>{

    constructor(@InjectRepository(Report) repo) {
        super(repo);
    }
/*
    async getReportDetails(
        options: IPaginationOptions,
        filterText: string,
        countryId: number,
        sectorId: number,
        ndcId: number,
        projectId: number,
        assessmentType: string,
    ): Promise<Pagination<Report>>{

        // console.log('selected type',assessmentType)
        
        let filter: string = '';

        if(filterText != null && filterText != undefined && filterText != '')
        {
            filter = '(rep.reportName LIKE :filterText)';
        }

        if(assessmentType != null && assessmentType != undefined && assessmentType != ''){
            
            if(filter){
                // console.log('ewwwww',assessmentType)
                filter = `${filter} and asse.assessmentType = :assessmentType`;
            }else {
                filter = `asse.assessmentType = :assessmentType`;
            }
            // filter = '(asse.assessmentType LIKE :assessmentType)';
        }

        if(countryId != 0) {
            if (filter) {
                filter = `${filter} and con.id = :countryId`
            }
            else {
                filter = `con.id = :countryId`
            }
        }

        if(sectorId != 0) {
            if (filter) {
                filter = `${filter} and sec.id = :sectorId`
            }
            else {
                filter = `sec.id = :sectorId`
            }
        }

        if(ndcId != 0) {
            if (filter) {
                filter = `${filter} and ndc.id = :ndcId`
            }
            else {
                filter = `ndc.id = :ndcId`
            }
        }

        if(projectId != 0) {
            if (filter) {
                filter = `${filter} and ca.id = :projectId`
            }
            else {
                filter = `ca.id = :projectId`
            }
        }

        var data = this.repo
        .createQueryBuilder('rep')

        .leftJoinAndMapOne('rep.country', Country, 'con', 'con.Id = rep.countryId')

        .leftJoinAndMapMany('rep.reportAsse', ReportAssessment, 'rasse', 'rasse.Id = rep.Id')
        .leftJoinAndMapMany('rep.assessment', Assessment, 'asse', 'rasse.assessmentId = asse.Id')

        .leftJoinAndMapMany('rep.reportNdc', ReportNdc, 'rndc', 'rndc.Id = rep.Id')
        .leftJoinAndMapMany('rep.ndc', Ndc, 'ndc', 'rndc.ndcId = ndc.Id')

        .leftJoinAndMapMany('rep.reportProject', ReportProject, 'rca', 'rca.Id = rep.Id')
        .leftJoinAndMapMany('rep.project', Project, 'ca', 'rca.projectId = ca.Id')

        .leftJoinAndMapMany('rep.reportSector', ReportSector, 'rsec', 'rsec.Id = rep.Id')
        .leftJoinAndMapMany('rep.sector', Sector, 'sec', 'rsec.sectorId = sec.Id')

        .where(filter, {
            filterText: `%${filterText}%`,
            countryId,
            sectorId,
            ndcId,
            projectId,
            assessmentType,
        })
        .orderBy('rep.createdOn', 'DESC');

        let resualt = await paginate(data, options);

        // console.log(data.getQuery());
        if(resualt){
            return resualt;
        }

    }

 */

}
