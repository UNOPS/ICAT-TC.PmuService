import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Project } from './entity/project.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Sector } from 'src/master-data/sector/sector.entity';
import { MitigationActionType } from 'src/master-data/mitigation-action/mitigation-action.entity';
import { ProjectStatus } from 'src/master-data/project-status/project-status.entity';
import { ProjectApprovalStatus } from 'src/master-data/project-approval-status/project-approval-status.entity';

@Injectable()
export class ProjectService extends TypeOrmCrudService<Project> {
  constructor(@InjectRepository(Project) repo) {
    super(repo);
  }

  async getProjectDetails(  
    options: IPaginationOptions,
    filterText: string,
    sectorId: number,
    statusId: number,
    mitigationActionTypeId: number,
    editedOn: string,
  ): Promise<Pagination<Project>> {
    let filter: string = '';
    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(dr.climateActionName LIKE :filterText OR dr.contactPersoFullName LIKE :filterText OR sec.name LIKE :filterText OR mit.name LIKE :filterText OR pst.name LIKE :filterText OR dr.editedOn LIKE :filterText)';
    }

    if (sectorId != 0) {
      if (filter) {
        filter = `${filter}  and dr.sectorId = :sectorId`;
      } else {
        filter = `dr.sectorId = :sectorId`;
      }
    }

    if (statusId != 0) {
      if (filter) {
        filter = `${filter}  and dr.projectStatusId = :statusId`;
      } else {
        filter = `dr.projectStatusId = :statusId`;
      }
    }

    if (mitigationActionTypeId != 0) {
      if (filter) {
        filter = `${filter}  and dr.mitigationActionTypeId = :mitigationActionTypeId`;
      } else {
        filter = `dr.mitigationActionTypeId = :mitigationActionTypeId`;
      }
    }

    let data = this.repo
      .createQueryBuilder('dr')
      .leftJoinAndMapOne('dr.sector', Sector, 'sec', 'sec.id = dr.sectorId')
      .leftJoinAndMapOne(
        'dr.mitigationAction',
        MitigationActionType,
        'mit',
        'mit.id = dr.mitigationActionTypeId',
      )
      .leftJoinAndMapOne(
        'dr.projectStatus',
        ProjectStatus,
        'pst',
        'pst.id = dr.projectStatusId',
      )
      .where(filter, {
        filterText: `%${filterText}%`,
        mitigationActionTypeId,
        sectorId,
        statusId,
        editedOn,
      })
      .orderBy('dr.createdOn', 'DESC');
    let result = await paginate(data, options);

    if (result) {
      return result;
    }
  }


  async getAllCAList(
    options: IPaginationOptions,
    filterText: string,
    projectStatusId: number,
    projectApprovalStatusId: number,
   
    countryId: number,
    sectorId: number,
  ): Promise<Pagination<Project>> {
    let filter: string = '';
    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(dr.climateActionName LIKE :filterText OR asse.assessmentType LIKE :filterText OR para.AssessmentYear LIKE :filterText OR dr.institution LIKE :filterText OR pas.name LIKE :filterText OR pst.name LIKE :filterText OR dr.contactPersoFullName LIKE :filterText  OR dr.editedOn LIKE :filterText OR dr.createdOn LIKE :filterText OR dr.acceptedDate LIKE :filterText)';
    }
    if (projectStatusId != 0) {
      if (filter) {
        filter = `${filter}  and dr.projectStatusId = :projectStatusId`;
      } else {
        filter = `dr.projectStatusId = :projectStatusId`;
      }
    }

    if (projectApprovalStatusId != 0) {
      if (filter) {
        filter = `${filter}  and dr.projectApprovalStatusId = :projectApprovalStatusId`;
      } else {
        filter = `dr.projectApprovalStatusId = :projectApprovalStatusId`;
      }
    }

       
      if (filter) {
        filter = `${filter}  and pas.id !=4 `; 
      } else {
        filter = `pas.id !=4`;
      }
    
    

    if (countryId != 0) {
      if (filter) {
        filter = `${filter}  and dr.countryId = :countryId`;
      } else {
        filter = `dr.countryId = :countryId`;
      }
    }

    if (sectorId != 0) {
      if (filter) {
        filter = `${filter}  and dr.sectorId = :sectorId`;
      } else {
        filter = `dr.sectorId = :sectorId`;
      }
    }

    let data = this.repo
      .createQueryBuilder('dr')
      .leftJoinAndMapOne(
        'dr.projectStatus',
        ProjectStatus,
        'pst',
        'pst.id = dr.projectStatusId',
      )
      .leftJoinAndMapOne(
        'dr.projectApprovalStatus',
        ProjectApprovalStatus,
        'pas',
        'pas.id = dr.projectApprovalStatusId',
      )
      
      .where(filter, {
        filterText: `%${filterText}%`,
        projectStatusId,
        projectApprovalStatusId,
        countryId,
        sectorId,
      })
      .orderBy('dr.createdOn', 'ASC');
    let result = await paginate(data, options);
    if (result) {
      return result;
    }
  }





  async getAllProjectDetails(
    options: IPaginationOptions,
    filterText: string,
    projectStatusId: number,
    projectApprovalStatusId: number,
    assessmentStatusName: string,
    Active: number,
    countryId: number,
    sectorId: number,
    
  ): Promise<Pagination<Project>> {
    let filter: string = '';
    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(dr.climateActionName LIKE :filterText  OR dr.institution LIKE :filterText OR pas.name LIKE :filterText OR pst.name LIKE :filterText OR dr.contactPersoFullName LIKE :filterText  OR dr.editedOn LIKE :filterText OR dr.createdOn LIKE :filterText OR dr.acceptedDate LIKE :filterText)';
    }

    if (projectStatusId !=0) {
      if (filter) {
        filter = `${filter}  and dr.projectStatusId = :projectStatusId`;
      } else {
        filter = `dr.projectStatusId = :projectStatusId`;
      }
    }

    if (projectApprovalStatusId != 0) {
      if (filter) {
        filter = `${filter}  and dr.projectApprovalStatusId = :projectApprovalStatusId`;
      } else {
        filter = `dr.projectApprovalStatusId = :projectApprovalStatusId`;
      }
    }

    if (assessmentStatusName != null && assessmentStatusName != undefined && assessmentStatusName != '') {
      if (filter) {
        filter = `${filter}  and asse.assessmentStage = :assessmentStatusName`;
      } else {
        filter = `asse.assessmentStage = :assessmentStatusName`;
      }
    }  
    if (Active == 1) {
      if (filter) {
        filter = `${filter}  and pas.id != 1 `; 
      } else {
        filter = `pas.id != 1`;
      }
    } 
    else if (Active == 2) {
      if (filter) {
        filter = `${filter}  and pas.id = 3 `; 
      } else {
        filter = `pas.id = 3 `;
      }
     
    } 

    
     

    if (countryId != 0) {
      if (filter) {
        filter = `${filter}  and dr.countryId = :countryId`;
      } else {
        filter = `dr.countryId = :countryId`;
      }
    }

    if (sectorId != 0) {
      if (filter) {
        filter = `${filter}  and dr.sectorId = :sectorId`;
      } else {
        filter = `dr.sectorId = :sectorId`;
      }
    }


    

    let data = this.repo
      .createQueryBuilder('dr')
      .leftJoinAndMapOne(
        'dr.projectStatus',
        ProjectStatus,
        'pst',
        'pst.id = dr.projectStatusId',
      )
      .leftJoinAndMapOne(
        'dr.projectApprovalStatus',
        ProjectApprovalStatus,
        'pas',
        'pas.id = dr.projectApprovalStatusId',
      )
      .leftJoinAndMapMany(
        'dr.assessement',
        'asse',
        'asse.projectId = dr.id',
      )


      .where(filter, {
        filterText: `%${filterText}%`,
        projectStatusId,
        projectApprovalStatusId,
        assessmentStatusName,
        Active,
        countryId,
        sectorId,
      })
      .orderBy('dr.createdOn', 'DESC'); 

    let result = await paginate(data, options);

    if (result) {
      return result;
    }
  }
}
