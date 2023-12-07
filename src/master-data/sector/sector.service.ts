import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SubSector } from '../sub-sector/entity/sub-sector.entity';
import { Sector } from './sector.entity';
import {SectorIndicator} from 'src/master-data/indicator/entities/sector-indicator.entity';
import {Indicator} from 'src/master-data/indicator/entities/indicator.entity'

@Injectable()
export class SectorService extends TypeOrmCrudService<Sector> {
  constructor(@InjectRepository(Sector) repo) {
    super(repo);
  }



  async getSectorDetails(  
    options: IPaginationOptions,
    filterText: string,
  ): Promise<Pagination<Sector>> {
    let filter: string = '';

    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(sr.name LIKE :filterText OR sr.description LIKE :filterText)';
    }

    let data = this.repo
      .createQueryBuilder('sr')
      .leftJoinAndMapMany('sr.subSector', SubSector, 'subsr', 'subsr.sectorId = sr.id')
      

      .where(filter, {
        filterText: `%${filterText}%`,

      })
     .orderBy('sr.createdOn', 'DESC');

    let resualt = await paginate(data, options);

    if (resualt) {
      return resualt;
    }
  }


  async getSector(sectorId: number) {
    let data;
    if (sectorId != 0) {
      data = this.repo.createQueryBuilder('sec')
        .leftJoinAndMapMany(
          'sec.sectorindicator',
          SectorIndicator,
          'cs',
          `sec.id = cs.sector `,

        ).leftJoinAndMapOne(
          'cs.indicator',
          Indicator,
          'ind',
          `ind.id = cs.indicator`
        )

        .where(
          `sec.id = ${sectorId}`
        )

      
    }else{}
    return data.getOne();

    
}


}
