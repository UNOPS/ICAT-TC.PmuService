import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Methodology } from './entity/methodology.entity';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Country } from 'src/country/entity/country.entity';
import { Indicator } from 'src/master-data/indicator/entities/indicator.entity';

@Injectable()
export class MethodologyService extends TypeOrmCrudService<Methodology>{

    constructor(@InjectRepository(Methodology) repo) {
        super(repo);
    }

    async getMethodologyDetails(
        options: IPaginationOptions,
        filterText: string,
        indicatorId: number,
        developedBy:string
    ): Promise<Pagination<Methodology>> {
        let filter: string = '';

        if (filterText != null && filterText != undefined && filterText != '') {
            filter =
                '(me.version LIKE :filterText OR me.developedBy LIKE :filterText OR me.name LIKE :filterText OR me.applicableSector LIKE :filterText OR me.documents LIKE :filterText)'
        }
        if (indicatorId != 0) {
            if (filter) {
                filter = `${filter} and me.indicatorId=:indicatorId`
            }
            else {
                filter = `me.indicatorId = :indicatorId`
            }
        }

        if (developedBy != "0") {
            console.log("dddd",developedBy)
            if (filter) {
                filter = `${filter} and me.developedBy=:developedBy`
            }
            else {
                filter = `me.developedBy = :developedBy`
            }
        }

        let data = this.repo
            .createQueryBuilder('me')
            .leftJoinAndMapOne('me.indicatorId', Indicator, 'indicator', 'indicator.id = me.indicatorId',)
            .leftJoinAndMapOne('me.countryId', Country, 'country', 'country.id = me.countryId',)
            .where(filter, {
                filterText: `%${filterText}%`,
                indicatorId,
                developedBy
            })
           // .orderBy('me.createdOn', 'DESC');

        let resualt = await paginate(data, options);

        if (resualt) {
            return resualt;

            
        }
    }

}
