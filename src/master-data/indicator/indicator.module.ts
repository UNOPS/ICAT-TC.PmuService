import { Module } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { IndicatorController } from './indicator.controller';
import {Indicator} from 'src/master-data/indicator/entities/indicator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IndicatorController],
  providers: [IndicatorService],
  imports: [TypeOrmModule.forFeature([Indicator])],
  exports: [IndicatorService],
})
export class IndicatorModule {}

