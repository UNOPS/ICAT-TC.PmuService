import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Country } from 'src/country/entity/country.entity';
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
    //To-do get user from context
   // const contextUser = "";
    if(auditDto.userName!= undefined){
      this.contextUser = auditDto.userName;
    }
    else{
      this.contextUser = this.request.user.username;
    }
    

   
   

  //  let user = await this.userRepo.findOne(40);
  
   
   
  //  console.log('============requset========', this.request);
    console.log('============contextUser========', this.contextUser);
    //To-do get user from context
    let user = await this.userRepo.findOne({
      where: { email: this.contextUser },
    });

    
    console.log("finduser---",user)

    let newAudit = new Audit();
    newAudit.action = auditDto.action;
    newAudit.actionStatus = auditDto.actionStatus;
    newAudit.comment = auditDto.comment;
    // newAudit.createdBy = auditDto.createdBy;
    // newAudit.createdOn = auditDto.createdOn;
    // newAudit.editedBy = auditDto.editedBy;
    // newAudit.editedOn = auditDto.editedOn;
    // newAudit.id = auditDto.id;
    // newAudit.status= auditDto.status;
    newAudit.user = user;
    newAudit.userName = user.firstName;
    //To-do save user role
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
    // let fDate = `${editedOn.getFullYear()}-${editedOn.getMonth()+1}-${editedOn.getDate()}`;

    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        // '(dr.climateActionName LIKE :filterText OR dr.description LIKE :filterText)';
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
          // '(dr.climateActionName LIKE :filterText OR dr.description LIKE :filterText)';
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

      // let user = await this.userRepo.findOne({
      //   where: { email: },
      // });

      if (filter) {
        filter = `${filter}  and Institution.id= :institutionId`;
      } else {
        filter = `Institution.id= :institutionId`;
      }
    }
    // if (editedOn != null && editedOn != undefined && editedOn != '') {
    //     if (filter) {
    //      let editdate = `dr.editedOn`;
    //      console.log('mmm','dr.editedOn')
    //       filter = `${filter}  and (dr.editedOn LIKE :editedOn)`;
    //     } else {
    //       filter = `dr.editedOn = :editedOn`;
    //     }
    //   }

    let data = this.repo
      .createQueryBuilder('dr')
      .leftJoinAndMapOne('dr.user', User, 'usr', 'usr.id = dr.userId')
      .leftJoinAndMapOne('usr.institution', Institution, 'Institution', 'Institution.id = usr.institutionId')//userType.id 

      // .innerJoinAndMapOne('dr.country', Country, 'coun', 'dr.countryId = coun.id')

      .where(filter, {
        filterText: `%${filterText}%`,
        userTypeId,
        action,
        editedOn: `%${editedOn}%`,
        institutionId
      })
      .orderBy('dr.createdOn', 'DESC');
    // console.log(
    //   '=====================================================================',
    // );
    // console.log(`dr.editedOn`);

    let resualt = await paginate(data, options);
    // console.log("rrrrrrr----",resualt.items[1].user.institution)

    if (resualt) {
      return resualt;
    }
  }
}
