import { Methodology } from 'src/methodology/entity/methodology.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('applicability')
export class ApplicabilityEntity extends MasterData {
  //   @ManyToMany((type) => Methodology, { cascade: false })
  //   @JoinTable({ name: 'methodology_applicability' })
  //   methodology: Methodology;

  @Column({ default: null })
  uniqueIdentification: string;
}