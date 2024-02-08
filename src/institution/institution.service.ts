import { User } from './../users/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Institution } from './institution.entity';

import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InstitutionType } from './institution.type.entity';
import { UserType } from 'src/users/user.type.entity';
import { Country } from 'src/country/entity/country.entity';

@Injectable()
export class InstitutionService extends TypeOrmCrudService<Institution> {
  
  constructor(
    @InjectRepository(Institution) repo,
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
    countryId: number
  ): Promise<any> {
    let filter: string = '';
    if (filterText != null && filterText != undefined && filterText != '') {     
        filter = `(ins.name LIKE :filterText OR ins.address LIKE :filterText OR type.name LIKE :filterText OR user.firstName LIKE :filterText OR user.lastName LIKE :filterText OR con.name LIKE :filterText)`;
      }

    
    if (countryId != 0 || filterText) {
      if (filter  && countryId!=0) {
        filter = `${filter}  AND con.id = ${countryId}`;
      } 
      else if (countryId !=0){
        filter =`con.id = ${countryId}`;
      }
      let data = this.repo
        .createQueryBuilder('ins')
        .innerJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')
        .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
        .leftJoinAndMapMany('ins.user', User, 'user', 'ins.id = user.institutionId and( user.userTypeId = 1 or user.userTypeId = 4)')
        .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id =user.userTypeId')
        .where(filter, {
          filterText: `%${filterText}%`,
        })
        .orderBy('ins.status', 'ASC')
      let result = await paginate(data, options);

      if (result) {
        let item = new Array()
        let re = new Array()
        let total: number

        total = result.meta.totalItems;
        item = await result.items;
        re.push(total);
        re.push(item)
        return re;
      }

    } else {

      const data = this.repo
        .createQueryBuilder('ins')
        .leftJoinAndMapOne(
          'ins.type',
          InstitutionType,
          'type',
          'type.id = ins.typeId',
        )
        .where(filter, {})
        .orderBy('ins.id', 'ASC');
      const result1 = await paginate(data, options);

      let newarray = new Array();
      for (let ins of result1.items) {
        newarray.push(ins.id)
      }
      const data3 = this.repo.find();

      const data1 = this.repo
        .createQueryBuilder('ins')
        .leftJoinAndMapMany(
          'ins.countries',
          Country,
          'con',
          'ins.id = con.institutionId',
        )
        .leftJoinAndMapOne(
          'ins.type',
          InstitutionType,
          'type',
          'type.id = ins.typeId',
        )
        .leftJoinAndMapMany(
          'ins.user',
          User,
          'user',
          'ins.id = user.institutionId',
        )
        .leftJoinAndMapOne(
          'user.userType',
          UserType,
          'userType',
          'userType.id =user.userTypeId',
        )
        .where('ins.id in (:...newarray)', { newarray })

      let item = new Array();
      let re = new Array();
      let total: number;
      if (data1) {

        total = (await data3).length;
        item = await data1.getMany();
        re.push(total);
        re.push(item)
        return re;
      }
    }
  }

  async getInstitution(insId: number) {
    let data = this.repo
      .createQueryBuilder('ins')
      .leftJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')
      .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
      .where(`ins.id = ${insId}`
      );

    return data.getOne();
  }


  async getPmuAdminAssignInstitution(
    options: IPaginationOptions,


  ): Promise<Pagination<Institution>> {
    let filter: string = '';

    if (filter) {
      filter = `con.id  = :countryId`;
    } else {
      filter = `user.institutionId IS NULL and user.userTypeId = 1`;
    }


    let data = this.repo
      .createQueryBuilder('ins')
      .leftJoinAndMapMany('ins.countries', Country, 'con', 'ins.id = con.institutionId')
      .leftJoinAndMapOne('ins.type', InstitutionType, 'type', 'type.id = ins.typeId')
      .leftJoinAndMapMany('ins.user', User, 'user', 'ins.id = user.institutionId')
      .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id =user.userTypeId')


      .where(filter, {

      })
      .orderBy('ins.status', 'ASC')

    let result = await paginate(data, options);

    if (result) {
      return result;
    }
  }


async findAll(){
  return this.repo.find();
} 
 
async getFilteredInstitution(filter: string): Promise<Institution[]> {

  let data = this.repo
    .createQueryBuilder('ins')
    .where(filter,{filter})
    .orderBy('name', 'ASC');
    return await data.getMany()
}









}
