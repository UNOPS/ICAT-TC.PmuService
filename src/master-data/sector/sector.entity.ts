import { CountrySector } from 'src/country/entity/country-sector.entity';
import { SectorIndicator } from 'src/master-data/indicator/entities/sector-indicator.entity';
import { LearningMaterialSector } from 'src/learning-material/entity/learning-material-sector.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import { Indicator } from 'src/master-data/indicator/entities/indicator.entity';
import {
  Entity,
  ManyToMany,
  JoinTable,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { SubSector } from '../sub-sector/entity/sub-sector.entity';

@Entity({ name: 'sector' })
export class Sector extends BaseTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ length: 300, default: null })
  description: string;

  @Column({ default: 1 })
  sortOrder: number;

@OneToMany(() => CountrySector, countrySector => countrySector.sector)
public countrysector!: CountrySector[];

@OneToMany(() => SectorIndicator, sectorindicator => sectorindicator.sector)
public sectorindicator!: SectorIndicator[];

  @OneToMany(() => LearningMaterialSector,(learningMaterialSector) => learningMaterialSector.sector)
  public learningMaterialsector!: LearningMaterialSector[];

  @OneToMany(() => SubSector,(subSector) => subSector.sector)
  public subSector!: SubSector[];


  @Column({ default: null })
  uniqueIdentification: string;


  @ManyToMany(type => Indicator, indicator => indicator.sectors)
  @JoinTable({
    name: 'sector_indicator',
    joinColumns: [{ name: 'sectorId' }],
    inverseJoinColumns: [{ name: 'indicatorId' }]
  })
  indicators: Indicator[];
}
