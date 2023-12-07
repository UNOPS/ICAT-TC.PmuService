import { Institution } from 'src/institution/institution.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountrySector } from './country-sector.entity';
import { countryStatus } from './country-status.entity';

@Entity({name: 'country'})
export class Country extends BaseTrackingEntity{
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  code: string;

  @Column({ default: null })
  code_extended: string;


  @Column({ default: null })
  name: string;

  @Column({ length: 300, default: null })
  description: string;

  @Column({ default: 1 })
  sortOrder: number;


  @Column({ default: null })
  isSystemUse: boolean;

  @Column({ default: null })
  isCA: boolean;

  @Column({ default: null })
  flagPath: string;

  @Column({ default: null })
  registeredDate: Date;

  
  @Column({ default: null })
  isMember: boolean;

  @Column({ default: null })  
  countryStatus: countryStatus;

  @Column({ default: null })
  region: string;

  @Column({ default: null })
  uniqueIdentification: string;

  @OneToMany(() => CountrySector, countrySector => countrySector.country,{eager:true})
  @JoinColumn()
  countrysector: CountrySector[];

  @ManyToOne((type) => Institution, { eager: true })
  @JoinColumn()
  institution?: Institution |null;


  @Column({ default: null })
  carboneMarketTool: boolean;

  @Column({ default: null })
  portfoloaTool: boolean;

  @Column({ default: null })
  investmentTool: boolean;

  @Column({ default: null })
  isSingleCountry: number;

  @Column({ default: null })
  domain: string;

}
