import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ApplicabilityEntity } from './applicability.entity';

@Injectable()
export class ApplicabilityService extends TypeOrmCrudService<ApplicabilityEntity> {
  constructor(@InjectRepository(ApplicabilityEntity) repo) {
    super(repo);
  }
}
