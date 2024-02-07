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
        `cou.isSystemUse =1`
      );
    return data.getMany();
  }

  async getAllCountry(
    options: IPaginationOptions,
    insId: number): Promise<Pagination<Country>> {


    if (insId == 0) {
      let data = this.repo.createQueryBuilder('cou')
        .leftJoinAndMapMany(
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
        .leftJoinAndMapMany(
          'cou.institution',
          Institution,
          'ins',
          `cou.institution = ${insId}`
        );
      return await paginate(data, options);
    }



  }
}
