import { Country } from "src/country/entity/country.entity";
// import { Indicator } from "src/indicator/indicator.entity";
import { Institution } from "src/institution/institution.entity";
import { ApplicabilityEntity } from "src/master-data/applicability/applicability.entity";
import { MethodologyData } from "src/master-data/methodology-data/methodology-data.entity";
import { MitigationActionType } from "src/master-data/mitigation-action/mitigation-action.entity";
import { Sector } from "src/master-data/sector/sector.entity";
import { BaseTrackingEntity } from "src/shared/entities/base.tracking.entity";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Active } from "./active.entity";
import { Indicator } from 'src/master-data/indicator/entities/indicator.entity';

@Entity({ name: 'methodology' })
export class Methodology extends BaseTrackingEntity {

  constructor() {
    super();
    this.createdBy = '';
    this.editedBy = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @Column()
  name: string;

  @Column({ default: null })
  displayName: string;

  @Column()
  developedBy: string;

  @Column({ default: null })
  parentId: number;

  @Column({ default: null })
  applicableSector: string;

  @Column()
  documents: string;

  @Column({ default: 0 })
  isActive: Active;

  @Column({ default: null })
  easenessOfDataCollection: string;

  @Column({ default: null })
  transportSubSector: string;

  @Column({ default: null })
  upstream_downstream: string;

  @Column({ default: null })
  ghgIncluded: string;

  @Column()
  @Generated("uuid")
  uniqueIdentification: string;

  @ManyToOne((type) => Country, { cascade: false })
  @JoinColumn({ name: 'countryId' })
  country?: Country;

  // @ManyToOne((type) => Indicator, { eager: true })
  // @JoinColumn()
  // indicator?: Indicator;
  // @ManyToOne((type) => Institution, { eager: true })
  // @JoinColumn()
  // institution?: Institution;

  @ManyToOne((type) => Sector, { cascade: false })
  @JoinColumn({ name: 'sectorId' })
  sector?: Sector; 

  @ManyToOne((type) => Indicator, { cascade: false })
  @JoinColumn({ name: 'indicatorId' })
  indicator?: Indicator;

  @ManyToOne((type) => MitigationActionType, { cascade: false })
  @JoinColumn({ name: 'mitigationActionTypeId' })
  mitigationActionType?: MitigationActionType;

  @ManyToOne((type) => ApplicabilityEntity, { cascade: false })
  @JoinColumn({ name: 'applicabilityId' })
  applicability?: ApplicabilityEntity;

  @ManyToOne((type) => MethodologyData, { cascade: false })
  @JoinColumn({ name: 'methodId' })
  method?: MethodologyData;

}
