import { User } from './../users/user.entity';
import { count, log } from 'console';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Institution } from './institution.entity';

import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InstitutionCategory } from './institution.category.entity';
import { InstitutionType } from './institution.type.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { UserType } from 'src/users/user.type.entity';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Country } from 'src/country/entity/country.entity';

@Injectable()
export class InstitutionService extends TypeOrmCrudService<Institution> {
  constructor(
    @InjectRepository(Institution) repo,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    // @InjectRepository(User)
    // private readonly userService: UsersService,
  ) {
    super(repo);
  }

  async softDelete(id: number) {
    this.repo.softDelete({ id });
    return;
  }

  async getInstitutionDetails(
    options: IPaginationOptions,
    filterText: string,
    countryId:number
  ): Promise<Pagination<Institution>>{
    let filter: string = '';

    if(filterText != null && filterText != undefined && filterText != ''){
      filter = 
      '(ins.name LIKE :filterText OR ins.address LIKE :filterText OR type.name LIKE :filterText OR user.firstName LIKE :filterText OR user.lastName LIKE :filterText OR con.name LIKE :filterText)';
     
    }
 
    
    if (countryId != 0) {
      console.log("tttt",countryId)
      if (filter) {
        console.log("GGGGGGGG")
       // filter = `${filter}  and con.id = :countryId`;//institution has many countries
        filter = `con.id  = :countryId`;
       // console.log("Inside the FILTER",filter)
      } else {
        filter = `con.id  = :countryId`;
      }
      let data = this.repo
      .createQueryBuilder('ins')
       .innerJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')//country = table name
    
      //.leftJoinAndMapOne('ins.category', InstitutionCategory, 'cate', 'cate.id = ins.categoryId')
      .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
      //for this condition only  one user can have for institution
     .leftJoinAndMapMany('ins.user', User, 'user', 'ins.id = user.institutionId and( user.userTypeId = 1 or user.userTypeId = 4)')
    // .leftJoinAndMapOne('ins.user', User, 'user')
      .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id =user.userTypeId')//userType.id 
      
      .where(filter, {
        filterText: `%${filterText}%`,
        countryId
      })
      .orderBy('ins.status', 'ASC')
      let resualt = await paginate(data, options);

      if(resualt){
       console.log('resula',resualt.items[5])
        return resualt;
      }

    }else{

      let data = this.repo
      .createQueryBuilder('ins')
      .leftJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')//country = table name
    
      //.leftJoinAndMapOne('ins.category', InstitutionCategory, 'cate', 'cate.id = ins.categoryId')
      .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
      //for this condition only  one user can have for institution
     .leftJoinAndMapMany('ins.user', User, 'user', 'ins.id = user.institutionId and( user.userTypeId = 1 or user.userTypeId = 4)')
    // .leftJoinAndMapOne('ins.user', User, 'user')
      .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id =user.userTypeId')//userType.id 
      
      .where(filter, {
        filterText: `%${filterText}%`,
        
      })
      .orderBy('ins.status', 'ASC')
      let resualt = await paginate(data, options);

      if(resualt){
       console.log('resula',resualt.items[5])
        return resualt;
      }

    }


 
      //  console.log('data........',data)
      

   // console.log('query',data.getQuery());

       
  }


  async getPmuAdminAssignInstitution(
    options: IPaginationOptions,
   
  
  ): Promise<Pagination<Institution>>{
    let filter: string = '';

    if (filter) {
      console.log("GGGGGGGG")
      filter = `con.id  = :countryId`;
     // console.log("Inside the FILTER",filter)
    } else {
      filter = `user.institutionId IS NULL and user.userTypeId = 1`;
    }


    let data = this.repo
        .createQueryBuilder('ins')
        .leftJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')//country = table name

        //.leftJoinAndMapOne('ins.category', InstitutionCategory, 'cate', 'cate.id = ins.categoryId')
        .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
       .leftJoinAndMapMany('ins.user', User, 'user', 'ins.id = user.institutionId')
      // .leftJoinAndMapOne('ins.user', User, 'user')
        .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id =user.userTypeId')//userType.id 
             

        .where(filter, {
          
        })
        .orderBy('ins.status', 'ASC')
      //  console.log('data........',data)
      

   // console.log('query',data.getQuery());

        let resualt = await paginate(data, options);

        if(resualt){
         console.log('pmuassignins====',resualt)
          return resualt;
        }
  }

  



  


  

  
}
