import { Controller, Get, Query, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { EmailNotificationService } from 'src/notifications/email.notification.service';
import { Repository } from 'typeorm-next';

import { Project } from './entity/project.entity';
import { ProjectService } from './project.service';
const fs = require('fs');

@Crud({
  model: {
    type: Project,
  },
  query: {
    join: {
      projectStatus: {
        eager: true,
      },
      sector: {
        eager: true,
      },
      subSector: {
        eager: true,
      },
      ndc: {
        eager: true,
      },
      subNdc: {
        eager: true,
      },
      projectOwner: {
        eager: true,
      },
      financingScheme: {
        eager: true,
      },
      assessments: {
        eager: true,
      },
      mappedInstitution: {
        eager: true,
      },
      country: {
        eager: true,
      },
      mitigationActionType: {
        eager: true,
      },
      projectApprovalStatus: {
        eager: true,
      },
    },
  },
})
@Controller('project')
export class ProjectController implements CrudController<Project> {
  constructor(
    public service: ProjectService,
    public mailService: EmailNotificationService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    public configService: ConfigService,
  ) {}

  get base(): CrudController<Project> {
    return this;
  }

  @Override()
  async createOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Project,
  ) {
    try {
      console.log(
        '-----------------------------------------------------------',
      );
      dto.createdBy = '-';
      dto.editedBy = '-';

      console.log(dto);

      let newplData = await this.base.createOneBase(req, dto);

      return newplData;
    } catch (error) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(error);
      throw error;
    }

    // await this.service.ceateSelfConvertion(dto.unitOfMeasure);
    // await this.service.ceateReverseConvertion(dto);
  }



  @Get(
    'AllClimateAction/projectinfo/:page/:limit/:filterText/:projectStatusId/:projectApprovalStatusId/:countryId/:sectorId',
  )
  async getAllClimateActionList(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('projectStatusId') projectStatusId: number,
    @Query('projectApprovalStatusId') projectApprovalStatusId: number,
    @Query('countryId') countryId: number,
    @Query('sectorId') sectorId: number,
  ): Promise<any> {
    // console.log("heelo controler");
    return await this.service.getAllCAList(
      {
        limit: limit,
        page: page,
      },
      filterText,
      projectStatusId,
      projectApprovalStatusId,
   
      countryId,
      sectorId,
    );
  }





  @Get(
    'project/projectinfo/:page/:limit/:sectorId/:statusId/:mitigationActionTypeId/:editedOn/:filterText', 
  )
  async getClimateActionDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sectorId') sectorId: number,
    @Query('statusId') statusId: number,
    @Query('mitigationActionTypeId') mitigationActionTypeId: number,
    @Query('editedOn') editedOn: string,
    @Query('filterText') filterText: string,
    
  ): Promise<any> {
    // console.log(moment(editedOn).format('YYYY-MM-DD'))
    return await this.service.getProjectDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      sectorId,
      statusId,
      mitigationActionTypeId,
      editedOn,
    );
  }

  @Get(
    'AllClimateActions/projectinfo/:page/:limit/:filterText/:projectStatusId/:projectApprovalStatusId/:assessmentStatusName/:Active/:countryId/:sectorId',
  )
  async getAllClimateActionDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('projectStatusId') projectStatusId: number,
    @Query('projectApprovalStatusId') projectApprovalStatusId: number,  
    @Query('assessmentStatusName') assessmentStatusName: string, 
    @Query('Active') Active: number,
    @Query('countryId') countryId: number,
    @Query('sectorId') sectorId: number,
  ): Promise<any> {
    return await this.service.getAllProjectDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      projectStatusId,
      projectApprovalStatusId,
      assessmentStatusName,
      Active, 
      countryId,
      sectorId,
    );
  }

  @Override()
  async updateOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Project,
  ) {
    let project = await this.projectRepository.findOne({
      where: { id: dto.id },
      relations: ['projectApprovalStatus'],
    });

    let updateData = await this.base.updateOneBase(req, dto);
    const baseurl = this.configService.get<string>('ClientURl');
    console.log(baseurl);

    if (
      dto.projectApprovalStatus &&
      dto.projectApprovalStatus.id !== project.projectApprovalStatus.id
    ) {
      if (dto.projectApprovalStatus.id === 1) {
        let emailTemplate = fs.readFileSync(
          './src/template/email/status-approved-ca.html',
          'utf8',
        );
        emailTemplate = emailTemplate.replace('[USER_NAME]', `User`);
        emailTemplate = emailTemplate.replace(
          '[CA_Name]',
          dto.climateActionName,
        );
        emailTemplate = emailTemplate.replace(
          '[CA_URL]',
          baseurl + 'propose-project?id=' + dto.id,
        );

        this.mailService.sendMail(
          project.email,
          'Approval Status Approved',
          'Approval Status Approved',
          emailTemplate,
        );
      }
      if (dto.projectApprovalStatus.id === 2) {
        let emailTemplate = fs.readFileSync(
          './src/template/email/status-rejected-ca.html',
          'utf8',
        );
        emailTemplate = emailTemplate.replace('[USER_NAME]', `User`);
        emailTemplate = emailTemplate.replace(
          '[CA_Name]',
          dto.climateActionName,
        );
        emailTemplate = emailTemplate.replace(
          '[CA_URL]',
          baseurl + 'propose-project?id=' + dto.id,
        );
        this.mailService.sendMail(
          project.email,
          'Approval Status Rejected',
          'Approval Status Rejected',
          emailTemplate,
        );
      }
      if (dto.projectApprovalStatus.id === 3) {
        let emailTemplate = fs.readFileSync(
          './src/template/email/status-datarequest-ca.html',
          'utf8',
        );
        emailTemplate = emailTemplate.replace('[USER_NAME]', `User`);
        emailTemplate = emailTemplate.replace(
          '[CA_Name]',
          dto.climateActionName,
        );
        emailTemplate = emailTemplate.replace(
          '[CA_URL]',
          baseurl + 'propose-project?id=' + dto.id,
        );
        this.mailService.sendMail(
          project.email,
          'Data request sent successfully',
          'Data request sent successfully',
          emailTemplate,
        );
      }
    }
  }
}
