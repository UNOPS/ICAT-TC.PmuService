import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Institution } from 'src/institution/institution.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AuditDto } from './dto/audit-dto';
import { Audit } from './entity/audit.entity';

@Injectable()
export class AuditService extends TypeOrmCrudService<Audit> {
  contextUser: any;
  constructor(
    @InjectRepository(Audit) repo,
    @InjectRepository(User)
    private readonly userRepo : Repository<User>,
     @Inject(REQUEST) private request,
 

  ) {
    super(repo);
  }

  async create(auditDto: AuditDto) {
    if(auditDto.userName!= undefined){
      this.contextUser = auditDto.userName;
    }
    else{
      this.contextUser = this.request.user.username;
    }
    

    let user = await this.userRepo.findOne({
      where: { email: this.contextUser },
    });


    let newAudit = new Audit();
    newAudit.action = auditDto.action;
    newAudit.actionStatus = auditDto.actionStatus;
    newAudit.comment = auditDto.comment;
    newAudit.user = user;
    newAudit.userName = user.firstName;
    newAudit.userType = user.userType.name;

    var newaudit = await this.repo.save(newAudit);
  }
 
  
  
 

  async getAuditDetails(
    options: IPaginationOptions,
    filterText: string,
    userTypeId: string,
    action: string,
    editedOn: string,
    institutionId:number
  ): Promise<Pagination<Audit>> {
    let filter: string = '';

    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(dr.userName LIKE :filterText OR dr.action LIKE :filterText OR dr.actionStatus LIKE :filterText OR dr.editedOn LIKE :filterText)';
    }

    
    if (userTypeId != null && userTypeId != undefined && userTypeId != '') {
      if (filter) {
        filter = `${filter}  and dr.userType= :userTypeId`;
      } else {
        filter = `dr.userType = :userTypeId`;
      }
    }
    if (editedOn != null && editedOn != undefined && editedOn != '') {
      if (filter) {
        filter =
          `${filter}  and(  dr.editedOn LIKE :editedOn)`;
      } else filter = '( dr.editedOn LIKE :editedOn)';
    }

    if (action != null && action != undefined && action != '') {
      if (filter) {
        filter = `${filter}  and dr.actionStatus = :action`;
      } else {
        filter = `dr.actionStatus = :action`;
      }

    }

    if (institutionId != null && institutionId != undefined ) {


      if (filter) {
        filter = `${filter}  and Institution.id= :institutionId`;
      } else {
        filter = `Institution.id= :institutionId`;
      }
    }

    let data = this.repo
      .createQueryBuilder('dr')
      .leftJoinAndMapOne('dr.user', User, 'usr', 'usr.id = dr.userId')
      .leftJoinAndMapOne('usr.institution', Institution, 'Institution', 'Institution.id = usr.institutionId')

      .where(filter, {
        filterText: `%${filterText}%`,
        userTypeId,
        action,
        editedOn: `%${editedOn}%`,
        institutionId
      })
      .orderBy('dr.createdOn', 'DESC');
    let result = await paginate(data, options);
    if (result) {
      return result;
    }
  }
}
