import { MasterData } from 'src/shared/entities/master.data.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Ndc } from './ndc.entity';

@Entity()
export class SubNdc extends MasterData {
  @ManyToOne((type) => Ndc)
  @JoinColumn()
  ndc: Ndc;


}
