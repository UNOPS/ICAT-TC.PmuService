import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Repository } from 'typeorm';
import { CountrySector } from './entity/country-sector.entity';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country>{
    constructor(
        @InjectRepository(Country)repo,
        @InjectRepository(CountrySector)
        public CountrySectorRepo: Repository<CountrySector>,


        ){
        super(repo);
    }


/*
    async updateCountry(req:CrudRequest, dto:Country)
    {
        let coun = await this.repo.update(dto.id,dto);
     
        var x:number = 0
        dto.countrysector.map((a) => {

           a.country.id = dto.id;
           a.sector.id = dto.countrysector[x].sector.id
           x++;
          
         });
         

         try {
          dto.countrysector.map(async (a) => {
            let lms = await this.CountrySectorRepo.save(await a);
          });
        } catch (error) {
          console.log(error);
        }

       
       
        return coun;
    }


    */

    async getCountry(countryId: number) {
      let data;
      if (countryId != 0) {
        data = this.repo.createQueryBuilder('cou')
          .leftJoinAndMapMany(
            'cou.countrysector',
            CountrySector,
            'cs',
            // `cs.countryId = cou.id `,
            `cou.id = cs.countryId `,

          ).leftJoinAndMapOne(
            'cs.sector',
            Sector,
            'sec',
            `sec.id = cs.sectorId`
          )
            // `meth.id = asse.methodologyId and asse.methodolgyId IS NOT NULL  and meth.countryId = ${country} `
          // ).innerJoinAndMapOne(

          // 'cs.sector',
          // Sector,
          // 'sec',
          // 'sec.id = cs.sectorId'
          // )
          .where(
            `cou.id = ${countryId}`
          )
        // .select(['COUNT(parm.name) as data', 'parm.name as name']).groupBy("parm.name");
        
      }else{}
      return data.getOne();
  
      
  }
}
