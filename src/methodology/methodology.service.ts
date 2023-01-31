import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Methodology } from './entity/methodology.entity';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Country } from 'src/country/entity/country.entity';

@Injectable()
export class MethodologyService extends TypeOrmCrudService<Methodology>{

    constructor(@InjectRepository(Methodology) repo) {
        super(repo);
    }

    async getMethodologyDetails(
        options: IPaginationOptions,
        filterText: string,
        sectorId: number,
        developedBy:string
    ): Promise<Pagination<Methodology>> {
        let filter: string = '';

        if (filterText != null && filterText != undefined && filterText != '') {
            filter =
                '(me.version LIKE :filterText OR me.developedBy LIKE :filterText OR me.name LIKE :filterText OR me.applicableSector LIKE :filterText OR me.documents LIKE :filterText)'
        }
        if (sectorId != 0) {
            if (filter) {
                filter = `${filter} and me.sectorId=:sectorId`
            }
            else {
                filter = `me.sectorId = :sectorId`
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
            .leftJoinAndMapOne('me.sectorId', Sector, 'sector', 'sector.id = me.sectorId',)
            .leftJoinAndMapOne('me.countryId', Country, 'country', 'country.id = me.countryId',)
            .where(filter, {
                filterText: `%${filterText}%`,
                sectorId,
                developedBy
            })
           // .orderBy('me.createdOn', 'DESC');

        let resualt = await paginate(data, options);

        if (resualt) {
            return resualt;
        }
    }

}
