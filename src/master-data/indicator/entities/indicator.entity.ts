import { Sector } from 'src/master-data/sector/sector.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({name: 'indicator'})
export class Indicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Sector, sector => sector.indicators)
  @JoinTable({
    name: 'sector_indicator',
    joinColumns: [{ name: 'indicatorId' }],
    inverseJoinColumns: [{ name: 'sectorId' }]
  })
  sectors: Sector[];
}

