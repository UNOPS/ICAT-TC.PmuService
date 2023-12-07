import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country>{
    constructor(
        @InjectRepository(Country)repo,


        ){
        super(repo);
    }



    async getCountry(countryId: number) {
      let data;
      if (countryId != 0) {
        data = this.repo.createQueryBuilder('cou')
          .where(
            `cou.id = ${countryId}`
          )
      }else{}
      return data.getOne();
  
      
  }
}
