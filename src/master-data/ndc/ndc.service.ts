import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Ndc } from './ndc.entity';

@Injectable()
export class NdcService extends TypeOrmCrudService<Ndc> {
  constructor(@InjectRepository(Ndc) repo) {
    super(repo);
  }
}
