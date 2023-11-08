import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Indicator } from './indicator.entity';
import openapi = require("@nestjs/swagger");
import * as swagger from '@nestjs/swagger'
@Entity({ name: 'sector_indicator' })
export class SectorIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Sector, sector => sector.indicators)
  sector: Sector;

  @ManyToOne(type => Indicator, indicator => indicator.sectors)
  indicator: Indicator;

}
