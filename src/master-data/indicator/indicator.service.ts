import { Injectable } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import {Indicator} from 'src/master-data/indicator/entities/indicator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class IndicatorService  extends TypeOrmCrudService <Indicator>  {

  constructor( @InjectRepository(Indicator) repo,){
    super(repo)
   }


  create(createIndicatorDto: CreateIndicatorDto) {
    return 'This action adds a new indicator';
  }
  findAll(): Promise<Indicator[]> {
    return this.repo.find();
  }


  update(id: number, updateIndicatorDto: UpdateIndicatorDto) {
    return `This action updates a #${id} indicator`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicator`;
  }
}
