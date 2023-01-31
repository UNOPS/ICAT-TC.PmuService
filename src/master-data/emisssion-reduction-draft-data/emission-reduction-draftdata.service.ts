import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { EmissionReductioDraftDataEntity } from './entity/emission-reductio-draft-data.entity';

@Injectable()
export class EmissionReductionDraftdataService extends TypeOrmCrudService<EmissionReductioDraftDataEntity> {
    constructor(@InjectRepository(EmissionReductioDraftDataEntity) repo: Repository<EmissionReductioDraftDataEntity>) {
        super(repo);
      }
}
