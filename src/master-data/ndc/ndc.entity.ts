import { Country } from 'src/country/entity/country.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Entity, ManyToOne, JoinColumn, OneToMany, JoinTable } from 'typeorm';
import { Sector } from '../sector/sector.entity';
import { NdcSet } from './ndc-set.entity';
import { SubNdc } from './sub-ndc.entity';

@Entity()
export class Ndc extends MasterData {
  @OneToMany(() => SubNdc, (subNdc) => subNdc.ndc, {
    cascade: false,
  })
  @JoinTable()
  subNdc: SubNdc[];

  @ManyToOne((type) => NdcSet, { cascade: false })
  @JoinColumn()
  set: NdcSet;

  @ManyToOne((type) => Country, { cascade: false })
  @JoinColumn()
  country: Country;

  @ManyToOne((type) => Sector, { cascade: false })
  @JoinColumn()
  sector: Sector;

  isSelected: boolean;
}
