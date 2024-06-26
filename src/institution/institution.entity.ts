
import { Country } from 'src/country/entity/country.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InstitutionType } from './institution.type.entity';

@Entity()
export class Institution extends BaseTrackingEntity {
 
  constructor() {
    super();
    this.status = 0;
    this.sortOrder = 0;
    this.isNational = false;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  sortOrder: number;


  @Column()
    @Generated("uuid")
  uniqueIdentification:string;

  @ManyToOne((type) => InstitutionType)
  @JoinColumn()
  type: InstitutionType;

  @Column()
  isNational: boolean;

  @ManyToOne((type) => Institution)
  @JoinColumn()
  parentInstitution?: Institution;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ default: 0 })
  canNotDelete?: boolean;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100 })
  contactNumber: string;

  @OneToMany(() => Country, (country) => country.institution, {
    cascade: false,
  })
  @JoinTable()
  countries: Country[];


}
