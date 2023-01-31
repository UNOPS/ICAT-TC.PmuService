import { Body, Controller, Get, Post, Query, Request, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import { request, response } from 'express';
import { Sector } from 'src/master-data/sector/sector.entity';
import { SectorService } from 'src/master-data/sector/sector.service';
import { Project } from 'src/project/entity/project.entity';
import { Repository } from 'typeorm-next';
//import { GetReportDto } from './dto/get-report.dto';
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
/*
    @Get(
        // 'report/reportinfo/:page/:limit/:filterText/:countryId/:sectorId/:ndcId/:projectId/:assessmentType',
        'report/reportinfo/:page/:limit/:filterText/:sectorId',
        )
    async getReportInfo(
        @Request() request,
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('filterText') filterText: string,
        @Query('countryId') countryId: number,
        @Query('sectorId') sectorId: number,
        @Query('ndcId') ndcId: number,
        @Query('projectId') projectId: number,
        @Query('assessmentType') assessmentType: string,
    ): Promise<any>{
        return await this.service.getReportDetails(
            {
                limit: limit,
                page: page,
            },
            filterText,
            countryId,
            sectorId,
            ndcId,
            projectId,
            assessmentType
        );
    }

    @Post('newReportInfo')
    async getNewReportInfor(
        @Body() getReportDto: GetReportDto,
        @Res() response: any,
    ): Promise<any>{

        console.log('dto...',getReportDto);
        let proIdList: number[] = [];
        for(var a=0; a<getReportDto.project.length;a++){
            // console.log('iddddddd')
            proIdList.push(getReportDto.project[a].sector.id);
        }
        // console.log('projects id list',proIdList);

        response = getReportDto.project[0].assessments

        console.log('assessment....',response);

        return response;
        
        
    }

    */
}
