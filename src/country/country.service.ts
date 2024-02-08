import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from './entity/country.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Institution } from 'src/institution/institution.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country>{
  
  constructor(
    @InjectRepository(Country) repo,


  ) {
    super(repo);
  }



  async getCountry(countryId: number) {
    let data;
    if (countryId != 0) {
      data = this.repo.createQueryBuilder('cou')
        .where(
          `cou.id = ${countryId}`
        )
    } else { }
    return data.getOne();


  }

  async getActiveCountry() {
    let data = this.repo.createQueryBuilder('cou')
      .where(
        `cou.isSystemUse =true`
      );
    return data.getMany();
  }

  async getFilter(
    options: IPaginationOptions,
    insId: string){
      let filter= insId;
      if(insId != 'institution.id =undefined'){
        let data= this.repo.createQueryBuilder('country')
        .innerJoinAndMapOne(
          'country.institution',
          Institution,
          'institution',
          'country.institution = institution.id and country.isSystemUse=true'
        )
        .where(filter,{insId});
  
        let a = await paginate(data, options);
        return a;
      }
      else{
        let data = this.repo.find({where:{isSystemUse:true}});
        return data;

      }
     
    }


  async getAllCountry(
    options: IPaginationOptions,
    insId: number){


    if (insId == 0) {
      let data = this.repo.createQueryBuilder('cou')
        .innerJoinAndMapOne(
          'cou.institution',
          Institution,
          'ins',
          'cou.institution = ins.id'
        );
      let a = await paginate(data, options);
      return a;
    }
    else {
      let data = this.repo.createQueryBuilder('cou')
        .innerJoinAndMapOne(
          'cou.institution',
          Institution,
          'ins',
          `cou.institution = ${insId}`
        );
      return await paginate(data, options);
    }



  }

  async getAll(){
    return this.repo.find();
  }

  async create(dto:Country){
    this.repo.save(dto);}
    
  async getManyFilteredCountries(filter: string): Promise<Country[]> {
    let data = this.repo
      .createQueryBuilder('country')
      .where(filter,{filter})
      .orderBy('name', 'ASC');
      return await data.getMany()
  }
}
